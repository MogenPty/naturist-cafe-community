"use client";

import { useState, useTransition } from "react";

interface DeleteButtonProps<T extends string> {
  id: T;
  title: string;
  deleteAction: (formData: FormData) => Promise<any>;
}

export default function DeleteButton<T extends string>({
  id,
  title,
  deleteAction,
}: DeleteButtonProps<T>) {
  const [isDeleting, startDeleteTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("id", id);

    try {
      await deleteAction(formData);
      // Optionally: show success message or refresh
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete. Please try again.");
    }
  };

  return (
    <>
      {showConfirm ? (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Are you sure?</span>
          <button
            type="button"
            onClick={() => {
              startDeleteTransition(handleDelete);
            }}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Yes"}
          </button>
          <button
            type="button"
            onClick={() => setShowConfirm(false)}
            className="text-gray-600 hover:text-gray-800 text-sm"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          className="text-red-600 hover:text-red-900"
        >
          Delete
        </button>
      )}
    </>
  );
}
