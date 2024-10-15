import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const errorToast=(error)=>{
    toast(error, {
        theme: "auto",
        type: "error",
        position: "top-center",
        dangerouslyHTMLString: true,
      });
}

const successToast=(success)=>{
    toast(success, {
        theme: "auto",
        type: "success",
        position: "top-center",
        dangerouslyHTMLString: true,
      });
}


export { errorToast, successToast };