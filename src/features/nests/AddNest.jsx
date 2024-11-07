import Button from "../../ui/Button";
import CreateNestForm from "./CreateNestForm";
import Modal from "../../ui/Modal";

function AddNest() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="nest-form">
          <Button>Add new nest</Button>
        </Modal.Open>
        <Modal.Window name="nest-form">
          <CreateNestForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddNest;
