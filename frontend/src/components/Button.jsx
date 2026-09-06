function Button({ children, variant = "primary", className = "" }) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg px-5 py-2.5 font-medium transition-colors duration-200";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "border border-border bg-surface text-text hover:bg-background",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

export default Button;