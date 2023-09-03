const retrieveQuizAnswerFromApi = async () => {
    const response = await fetch("/api/questions/answer");
    console.log(response);
  
    const json = await response.json();
    console.log(json);
  };
  
  const retrieveQuizRandQuestionFromApi = async () => {
    const response = await fetch("/api/questions/random");
    console.log(response);
    const json = await response.json();
    console.log(json);
  };

  const registrationSuccessAlert = async () => {
    // After successful registration
    Swal.fire({
      icon: 'success',
      title: 'Registration Successful',
      text: 'You have successfully registered!',
    });

  };