// פונקציה שתבדוק אם הכתובת לא ריקה
// export const isValidAddress = (input: string): boolean => {
//   return input.trim().length > 0;
// };

export const handlePlaceSelect = (
  selectedAddress: string,
  setAddress: React.Dispatch<React.SetStateAction<string>>,
  setErrors: React.Dispatch<
    React.SetStateAction<{
      address?: string;
    }>
  >,
  setIsSelectedFromAutocomplete: (value: React.SetStateAction<boolean>) => void
) => {
  setAddress(selectedAddress); // עדכון הכתובת הנבחרת
  setErrors((prev) => ({ ...prev, address: undefined })); // איפוס שגיאות
  setIsSelectedFromAutocomplete(true); // הצבעה על כך שהכתובת נבחרה מתוך ההשלמה
};

export const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setChangeAddress: (changeAddress: string) => void,
  setIsSelectedFromAutocomplete: (value: React.SetStateAction<boolean>) => void
) => {
  setChangeAddress(e.target.value);
  // עדכון כתובת לפי הזנה חופשית של המשתמש
  setIsSelectedFromAutocomplete(false); // אם המשתמש התחיל להקליד, לא נבחרה כתובת מתוך ההשלמה
};
