export const getKey = () => `Bluey_${new Date().toLocaleDateString()}`;
export const getKeyCorrect = () => getKey() + "_Correct";
export const getKeyWrong = () => getKey() + "_Wrong";
