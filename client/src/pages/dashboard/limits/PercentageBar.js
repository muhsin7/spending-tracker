const PercentageBar = (props) => {
  const { completed } = props;
  const percentage = completed > 100 ? 100 : completed;

  const containerStyles = {
    height: 23,
    width: "100%",
    backgroundColor: "#1e1e1e",
    borderRadius: 50,
    marginTop: 5,
  };

  const fillerStyles = {
    height: "100%",
    width: `${percentage}%`,
    backgroundColor: percentage < 100 ? "#ffb036" : "#ef0033",
    borderRadius: "inherit",
    textAlign: "right",
  };

  const labelStyles = {
    padding: 5,
    fontWeight: "bold",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default PercentageBar;
