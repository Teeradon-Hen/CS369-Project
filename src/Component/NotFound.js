import { Middle } from "./PaymentTable";
import { ContainerCol, FlexMiddle80, FlexMiddleOuter10 } from "./PaymentConfirm";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export default function NotFound() {

    const navigate = useNavigate();

    swal({
        title: "ERROR: Path not found",
        text: "ไม่พบเส้นทางดัวกล่าว",
        icon: "warning",
        buttons: [false, "กลับสู่หน้าเดิม"],
        dangerMode: true,
        closeOnClickOutside: false
    }).then((willDelete) => {
        if (willDelete) {
            navigate(-1);
            }
    });

    return (
        <>
        </>
    );
}