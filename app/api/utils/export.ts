import { toastNotify } from "./toastNotify";

export const jsonHandler = async (response) => {
    const hiddenElement = document.createElement("a");
    const textFile = new Blob([JSON.stringify(response)], {
      type: "text/plain",
    });
    const url = window.URL.createObjectURL(textFile);
    hiddenElement.href = url;
    hiddenElement.target = "_blank";
    hiddenElement.download = `companyQuizzesResults.json`;
    hiddenElement.click();
    toastNotify(response, "File was downloaded");
    return { data: null };
};

export const csvHandler = async (response) => {
    const file = await response.blob();
    const hiddenElement = document.createElement("a");
    const url = window.URL.createObjectURL(file);
    hiddenElement.href = url;
    hiddenElement.target = "_blank";
    hiddenElement.download = `companyQuizzesResults.csv`;
    hiddenElement.click();
    toastNotify(response, "File was downloaded");
    return { data: null };
};