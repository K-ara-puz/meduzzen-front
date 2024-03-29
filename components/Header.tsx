"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { GlobalAuthContext } from "./providers/GlobalAuthProviderContext";
import { useAppDispatch } from "@/store/hooks";
import { setTokens } from "@/store/slices/authSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { useLogoutUserMutation } from "@/app/api/authApi";

let pages = ["About", "Users", "Companies", "Invites"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const router = useRouter();
  const authData = useContext(GlobalAuthContext);
  const dispatch = useAppDispatch();
  const { logout } = useAuth0();
  const [logoutUser] = useLogoutUserMutation();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSelectMenuItem = (page: string) => {
    switch (page) {
      case "About":
        router.push("/about");
        break;
      case "Users":
        router.push("/users");
        break;
      case "Companies":
        router.push("/companies");
        break;
      case "Invites":
        router.push("/invites");
        break;
    }
    handleCloseNavMenu();
  };
  const handleSelectUserMenuItem = async (page: string) => {
    switch (page) {
      case "Profile":
        router.push("/profile");
        break;
      case "Notifications":
        router.push("/notifications");
        break;
      case "Logout":
        await logoutUserHandler();
        router.push("/");
        break;
      case "Login":
        router.push("/login");
        break;
      case "Registration":
        router.push("/registration");
        break;
    }
    handleCloseUserMenu();
  };

  const getUserMenu = () => {
    if (authData['isAuth']) {
      return ["Profile", "Notifications", "Logout"];
    }
    return ["Login", "Registration"];
  };

  const logoutUserHandler = async () => {
    await logoutUser();
    await dispatch(setTokens({}));
    await logout();
  };

  return (
    <AppBar position="static" className="z-10">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleSelectMenuItem(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleSelectMenuItem(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {authData['isAuth'] && (
            <div className="mr-4 hidden md:flex">{authData["user"]["email"]}</div>
          )}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {authData['isAuth'] && authData["user"]["avatar"] ? (
                  <Avatar
                    alt="Remy Sharp"
                    src={`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}/${authData["user"]["avatar"]}`}
                  />
                ) : (
                  <Avatar alt="Remy Sharp" />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {getUserMenu().map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleSelectUserMenuItem(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
