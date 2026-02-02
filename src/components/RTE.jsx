import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export const RTE = ({
  name = "content",
  control,
  label,
  defaultValue = "",
}) => {
  return (
    <div className="w-full mb-4">
      {label && (
        <label className="inline-block pl-1 mb-2 font-medium">{label}</label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            value={value || ""}
            onEditorChange={(content) => onChange(content)}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
              ],
              toolbar:
                "undo redo | bold italic | bullist numlist | link image | code | preview | fullscreen | help | alignleft aligncenter alignright alignjustify | outdent indent | removeformat | charmap | searchreplace | visualblocks | insertdatetime media table | anchor | wordcount | forecolor backcolor | fontsizeselect | fontselect | styleselect | formatselect",
              content_style: "",
            }}
          />
        )}
      />
    </div>
  );
};
