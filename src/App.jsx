import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addStudent,
  updateStudent,
  deleteStudent,
  clearAllStudents,
} from "./redux/studentsSlice";
import Modal from "./Modal";

function App() {
  const students = useSelector((state) => state.students.students);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [modalType, setModalType] = useState("");

  const handleAddStudent = () => {
    dispatch(addStudent({ id: Date.now(), name: "New Student", age: 18 }));
  };

  const handleUpdateStudent = (student) => {
    dispatch(updateStudent(student));
  };

  const handleDeleteStudent = (id) => {
    dispatch(deleteStudent(id));
  };

  const handleClearAllStudents = () => {
    dispatch(clearAllStudents());
  };

  const openModalForUpdate = (student) => {
    setCurrentStudent(student);
    setModalType("update");
    setIsModalOpen(true);
  };

  const openModalForUpdateName = (student) => {
    setCurrentStudent(student);
    setModalType("updateName");
    setIsModalOpen(true);
  };

  const openModalForIncreaseAge = (student) => {
    setCurrentStudent(student);
    setModalType("increaseAge");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStudent(null);
  };

  const handleSubmit = (updatedStudent) => {
    if (modalType === "update") {
      handleUpdateStudent(updatedStudent);
    } else if (modalType === "updateName") {
      handleUpdateStudent({ ...updatedStudent, age: currentStudent.age });
    } else if (modalType === "increaseAge") {
      handleUpdateStudent({
        ...currentStudent,
        age: Number(updatedStudent.age),
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Students List</h1>
      <ul className="space-y-4">
        {students.map((student) => (
          <li
            key={student.id}
            className="flex items-center justify-between p-4 border rounded shadow-md"
          >
            <div>
              <span className="font-semibold">{student.name}</span> -{" "}
              <span className="text-gray-600">{student.age} yosh</span>
            </div>
            <div className="space-x-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => openModalForUpdate(student)}
              >
                Yangilash
              </button>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                onClick={() => openModalForUpdateName(student)}
              >
                Ismni yangilash
              </button>
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                onClick={() => openModalForIncreaseAge(student)}
              >
                yoshni yangilash
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleDeleteStudent(student.id)}
              >
                O'chirish
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-between">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleAddStudent}
        >
          Yangi student qo'shish
        </button>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          onClick={handleClearAllStudents}
        >
          Barcha student malumotlarini o'chirish
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        student={currentStudent}
        modalType={modalType}
      />
    </div>
  );
}

export default App;
