import { FocusEvent } from "react";

type NotesProps = {
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
};

const Notes = (props: NotesProps) => {
  const { onBlur } = props;
  return (
    <div className="mt-4">
      <p className="text-xs italic">Notes</p>
      <textarea className="rounded w-full h-28" onBlur={onBlur} />
    </div>
  );
};

export default Notes;
