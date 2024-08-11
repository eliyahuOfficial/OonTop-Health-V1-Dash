///dialog.ts
import Swal from "sweetalert2";



export const showSuccessDialog = (title: string, text: string) => {
    return Swal.fire({
        title,
        text,
        icon: "success",
        position: "top-end",
        iconColor: "#3160fa",
        showConfirmButton: false,
        timer: 1500,



    });
};



export const showErrorDialog = (title: string, text: string) => {
    return Swal.fire({
        title,
        text,
        icon: "error",
        position: "top-end",
        iconColor: "#3160fa",
        showConfirmButton: false,
        timer: 1500

    });
};




export const showSuccessCreate = (title: string, text: string) => {
    return Swal.fire({
        title: "Your work has been saved",

        position: "top-end",
        icon: "success",
        iconColor: "#3160fa",
        showConfirmButton: false,
        timer: 1500

    });
}

const dialogs = { success: showSuccessDialog, error: showErrorDialog, create: showSuccessCreate };
export default dialogs;