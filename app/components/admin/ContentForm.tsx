"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createContent, updateContent } from "../../lib/db/actions";
import type { PagesContent } from "../../lib/db/schema";

// import Image from "next/image";

interface ContentFormProps {
  content?: PagesContent | null;
}

export default function ContentForm({ content }: ContentFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePublicId, setImagePublicId] = useState(
    content?.imagePublicId || "",
  );
  const [showImagePreview, setShowImagePreview] = useState(
    !!content?.imagePublicId,
  );

  const isEditing = !!content;

  // Cloudinary upload widget configuration
  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dq4rxwjrh";

  const openCloudinaryWidget = () => {
    if (typeof window !== "undefined" && (window as any).cloudinary) {
      (window as any).cloudinary.openUploadWidget(
        {
          cloudName,
          uploadPreset: "unsigned", // You'll need to configure an unsigned upload preset in Cloudinary
          sources: ["local", "url", "camera"],
          multiple: false,
          maxFiles: 1,
        },
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            const publicId = result.info.public_id;
            setImagePublicId(publicId);
            setShowImagePreview(true);
            // Update the hidden input
            const input = document.getElementById(
              "imagePublicId",
            ) as HTMLInputElement;
            if (input) input.value = publicId;
          }
        },
      );
    } else {
      alert(
        "Cloudinary upload widget not loaded. Please include Cloudinary widget script.",
      );
    }
  };

  async function handleSubmit(formData: FormData) {
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      if (isEditing) {
        await updateContent(content.id, formData);
      } else {
        await createContent(formData);
      }
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/content");
      }, 1500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="rounded-md bg-green-50 p-4">
          <p className="text-sm text-green-800">
            Content {isEditing ? "updated" : "created"} successfully!
            Redirecting...
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section (Unique identifier) */}
        <div className="md:col-span-2">
          <label
            htmlFor="section"
            className="block text-sm font-medium text-gray-700"
          >
            Section Identifier *
          </label>
          <input
            type="text"
            name="section"
            id={"section"}
            required
            defaultValue={content?.section || ""}
            disabled={isEditing}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:ring-nature-500 focus:border-nature-500 focus:outline-none disabled:opacity-50"
            placeholder="e.g., hero_title, constitution_values"
          />
          <p className="text-xs text-gray-500 mt-1">
            {isEditing
              ? "Section identifier cannot be changed after creation."
              : "Unique identifier for this content piece. Use snake_case (e.g., hero_subtitle)."}
          </p>
        </div>

        {/* Content Type */}
        <div>
          <label
            htmlFor="contentType"
            className="block text-sm font-medium text-gray-700"
          >
            Content Type *
          </label>
          <select
            name="contentType"
            id={"contentType"}
            required
            defaultValue={content?.contentType || "text"}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-nature-500 focus:border-nature-500 focus:outline-none"
          >
            <option value="text">Text</option>
            <option value="html">HTML</option>
            <option value="image">Image</option>
            <option value="json">JSON (structured data)</option>
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label
            htmlFor="sortOrder"
            className="block text-sm font-medium text-gray-700"
          >
            Sort Order
          </label>
          <input
            type="number"
            name="sortOrder"
            id={"sortOrder"}
            min={0}
            defaultValue={content?.sortOrder || 0}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-nature-500 focus:border-nature-500 focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            Lower numbers appear first when listing multiple items
          </p>
        </div>

        {/* Text Value (for text/html types) */}
        <div className="md:col-span-2">
          <label
            htmlFor="textValue"
            className="block text-sm font-medium text-gray-700"
          >
            Text / HTML Content
          </label>
          <textarea
            name="textValue"
            id={"textValue"}
            rows={6}
            defaultValue={content?.textValue || ""}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-nature-500 focus:border-nature-500 focus:outline-none"
            placeholder="Enter text or HTML content here..."
          />
          <p className="text-xs text-gray-500 mt-1">
            For HTML content (like rich text), you can include HTML tags. For
            plain text, just type normally.
          </p>
        </div>

        {/* Image Upload Section */}
        <div className="md:col-span-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="btnUploadImage"
          >
            Image Upload (Cloudinary)
          </label>

          <div className="mt-1 flex items-center gap-4">
            <button
              type="button"
              name="btnUploadImage"
              id={"btnUploadImage"}
              onClick={openCloudinaryWidget}
              className="px-4 py-2 bg-nature-600 text-white rounded-md hover:bg-nature-700 font-medium"
            >
              Upload Image
            </button>

            <div className="flex-1">
              <label htmlFor="imagePublicId" className="sr-only">
                Image Public ID
              </label>
              <input
                type="text"
                name="imagePublicId"
                id={"imagePublicId"}
                value={imagePublicId}
                onChange={(e) => {
                  setImagePublicId(e.target.value);
                  setShowImagePreview(!!e.target.value);
                }}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-nature-500 focus:border-nature-500 focus:outline-none"
                placeholder="Cloudinary public ID (auto-filled after upload)"
              />
            </div>
          </div>

          {showImagePreview && imagePublicId && (
            <div className="mt-4">
              <p className="text-sm text-gray-700 mb-2">Image Preview:</p>
              <div className="relative w-48 h-32 border border-gray-200 rounded-md overflow-hidden bg-gray-50">
                <img
                  src={`https://res.cloudinary.com/${cloudName}/image/upload/${imagePublicId}`}
                  alt={content?.imageAlt || "Preview"}
                  className="w-full h-full object-cover"
                  width={300}
                  height={300}
                  onError={() => setShowImagePreview(false)}
                />
              </div>
            </div>
          )}

          <p className="text-xs text-gray-500 mt-2">
            Upload an image to Cloudinary or paste a public ID. The image will
            be served via Cloudinary CDN.
          </p>
        </div>

        {/* Image Alt Text */}
        <div className="md:col-span-2">
          <label
            htmlFor="imageAlt"
            className="block text-sm font-medium text-gray-700"
          >
            Image Alt Text
          </label>
          <input
            type="text"
            name="imageAlt"
            id={"imageAlt"}
            defaultValue={content?.imageAlt || ""}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-nature-500 focus:border-nature-500 focus:outline-none"
            placeholder="Descriptive text for accessibility"
          />
        </div>

        {/* Active */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="active"
            id={"active"}
            defaultChecked={content?.active !== false}
            className="h-4 w-4 text-nature-600 focus:ring-nature-500 border-gray-300 rounded"
          />
          <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
            Active (visible on website)
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t">
        <a
          href="/admin/content"
          className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </a>
        <button
          type="submit"
          disabled={loading || success}
          className="px-4 py-2 bg-nature-600 text-white rounded-md hover:bg-nature-700 font-medium disabled:opacity-50"
        >
          {loading
            ? isEditing
              ? "Updating..."
              : "Creating..."
            : isEditing
              ? "Update Content"
              : "Create Content"}
        </button>
      </div>
    </form>
  );
}
