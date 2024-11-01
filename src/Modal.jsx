import React from "react";

function Modal({ isOpen, onClose, onSubmit, student, modalType }) {
  if (!isOpen) return null;

  const [name, setName] = React.useState(student ? student.name : "");
  const [age, setAge] = React.useState(student ? student.age : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedStudent = { ...student };

    if (modalType === "update") {
      updatedStudent.name = name;
      updatedStudent.age = Number(age);
    } else if (modalType === "updateName") {
      updatedStudent.name = name;
    } else if (modalType === "increaseAge") {
      updatedStudent.age = Number(age);
    }

    onSubmit(updatedStudent);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-2">
          {modalType === "update"
            ? "Student ma'lumotlarini yangilash"
            : modalType === "updateName"
            ? "Ismni yangilash"
            : "Yoshni yangilash"}
        </h2>
        <form onSubmit={handleSubmit}>
          {modalType !== "increaseAge" && (
            <div className="mb-4">
              <label className="block mb-1">Ism:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full rounded"
                required
              />
            </div>
          )}
          {modalType !== "updateName" && (
            <div className="mb-4">
              <label className="block mb-1">Age:</label>
              <input
                type="number"
                value={modalType === "increaseAge" ? age : student.age}
                onChange={(e) => setAge(e.target.value)}
                className="border p-2 w-full rounded"
                required
              />
            </div>
          )}
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Yangilash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
