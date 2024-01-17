const Button = ({ btnClass, handleClick, children }) => {
  return (
    <button className={btnClass} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
