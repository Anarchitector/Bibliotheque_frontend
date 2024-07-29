function Label({ value, checked, onChange, name }: LabelProps) {
    return (
      <label>
        <input
          type="radio"
          value={value}
          checked={checked}
          onChange={onChange}
          name="userType"
        />
        {name}
      </label>
    );
  }

export default Label