
    
    const loader = document.querySelector(".loader");
    const oStep = 0.1;
    

    
    
    if (!loader.style.opacity) {
        loader.style.opacity = 1
    }
    window.onload = () => {
        setTimeout(() => {
            const opacity = setInterval(() => {
                loader.style.opacity -= oStep;
                // console.log(loader.style.opacity);
            if (loader.style.opacity == 0) {
                clearInterval(opacity);
                loader.style.display = "none";
            }
            }, 50)
        
        }, 3000)
    }

