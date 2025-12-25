/* eslint-disable react/prop-types */

const Toggle = ({
  label,
  enabled,
  onChange,
  disabled,
  activeColor = "bg-orange-500",
}) => {
  const handleClick = () => {
    if (disabled) return;
    onChange(!enabled);
  };

  return (
    <label className="flex cursor-pointer items-center gap-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>

      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${enabled ? activeColor : "bg-gray-300"} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${enabled ? "translate-x-6" : "translate-x-1"}`}
        />
      </button>
    </label>
  );
};

export default Toggle;
