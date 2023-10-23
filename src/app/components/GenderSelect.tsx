const RadioButton = () => {
  return (
    <div>
      <p>Gender</p>
      <div className="flex gap-1 items-center">
        <input type="radio" name="gender" value="Male" />
        <span className="mr-1">Male</span>
        <input type="radio" name="gender" value="Female" />
        <span className="mr-1">Female</span>
      </div>
    </div>
  );
};

export default RadioButton;
