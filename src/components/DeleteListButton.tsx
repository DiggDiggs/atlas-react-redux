import deleteListButton from "../assets/deleteListButton.svg";
import { useDispatch } from "react-redux";
import { deleteList } from "./slices/listsSlice";


interface DeleteListButtonProps {
  listId: string;
  onClick: () => void;
}

export const DeleteListButton: React.FC<DeleteListButtonProps> = ({ listId, onClick }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteList({ id: listId }));
    onClick?.();
  };

  return (
    <div className="h-[30px]">
      <button
        className="h-[30px] w-[30px] cursor-pointer "
        onClick={handleDelete}
        aria-label="Delete list">
        <img
          src={deleteListButton}
          alt="Delete Button"
          className="filter invert">
        </img>
      </button>
    </div>
  );
};
