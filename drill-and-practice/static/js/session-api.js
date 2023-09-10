const sessionStatusMonitor = async () => {
    const sessionStatus = await fetch("/api/logout");
    const sessionStatusJSON = await sessionStatus.json();
    if(sessionStatusJSON.user !== "null"){//only logged in users need to be checked
      const sessionCheckInterval = 15 * 60 * 1000 //check if user idle status every 15 minutes
      
      const interval = setInterval(async () => {
        const sessionStatus = await fetch("/api/logout");
        const sessionStatusJSON = await sessionStatus.json();
        if(sessionStatusJSON.expired){//log user out if idle for too long
            window.location.href = "/auth/logout";
            clearInterval(interval);
            console.log("User session expired clearing check interval");
          }
        },sessionCheckInterval);
      }
  };
  sessionStatusMonitor();