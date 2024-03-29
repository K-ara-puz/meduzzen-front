export enum CompanyMemberRoles {
  owner = "owner",
  admin = "admin",
  simpleUser = "user"
}
export enum InviteStatus {
  pending = "pending",
  aborted = "aborted",
  canceled = "canceled",
  approved = "approved"
}
export enum InviteType {
  request = "request",
  invite = "invite"
}
export enum CompaniesMainTabs {
  addCompany = "addCompany",
  myCompanies = "myCompanies",
  allCompanies = "allCompanies",
  whereIMember = "whereIMember",
}
export enum CompanyProfileMainTabs {
  members = "members",
  admins = "admins",
  invites = "invites",
  requests = "requests",
  quizzes = "quizzes",
  analitics = "analitics"
}
export enum UserProfileMainTabs {
  editUserInfo = "editUserInfo",
  analitics = "analitics",
  exportData = "exportData",
  quizzes = "quizzes",
  companies = "companies"
}
export enum NotificationStatus {
  received = "received",
  viewed = "viewed"
}