import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileImage({
  name = "image",
  label = "画像を選択",
  multiple = false,
}: {
  name: string;
  label: string;
  multiple: boolean;
}) {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<AddPhotoAlternateIcon />}
      className="max-w-fit"
    >
      {label}
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => console.log(event.target.name, event.target.files)}
        multiple={multiple ? true : false}
        accept="image/*"
        name={name}
      />
    </Button>
  );
}
