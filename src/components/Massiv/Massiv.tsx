const Massiv = () => {
  let massivStrok = [];
  for (let stroka = 0; stroka < 10; stroka++) {
    // massivStrok.push("q ");
    let massivStolbcov = [];
    for (let stolbec = 0; stolbec < 10; stolbec++) {
      massivStolbcov.push("q ");
    }
    massivStrok.push(<div>{massivStolbcov}</div>);
  }

  return massivStrok;
};

export default Massiv;
