import { useState } from "react";

const useRandomPasswordGenerate = () => {
  const [randomPassword, setRandomPassword] = useState(null);
  const lenght = 6;
  const upperCase = "ABCDEFGHIJKNMOPQRSTUVWXYZ";
  const lowerCase = "abcdefghijknmopqrstuvwxyz";
  const number = "0123456789";
  // const symbol = "@#$%/<*>?";
  const allCharacters = upperCase + lowerCase + number;
  const generatePassword = () => {
    let password = "";
    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += number[Math.floor(Math.random() * number.length)];

    while (lenght > password.length) {
      password +=
        allCharacters[Math.floor(Math.random() * allCharacters.length)];
    }
    console.log(password);
    // passwordBox.value = password;
    setRandomPassword(password);
  };
  return [randomPassword, generatePassword];
};

export default useRandomPasswordGenerate;
