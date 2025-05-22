let imageUploaded = false;
const encoded = encodeURIComponent("myData");
const url = `${location.origin}/view.html?data=${encoded}`;
document.getElementById("pageLink").textContent = url;

function moveImg() {
    const logo = document.getElementById("logoimg");
    if (!logo) return;

    logo.style.transition = "top 1s ease, transform 1s ease";
    logo.style.top = "50px";
    logo.style.transform = "translate(-50%, -50%) scale(0.6)";
}

function addBg() {
    const background = document.getElementById("background");
    const logoimg = document.getElementById("logoimg");
    
    if (!background || !logoimg) return;

    background.style.opacity = 1;
    logoimg.style.opacity = 1;
    setTimeout(moveImg, 2000);
}

function fadeIn(element, duration = 1000, delay = 0, callback = null) {
    if (!element) return;
    
    element.style.opacity = 0;
    element.style.display = "block";
    let start = null;

    function animate(timestamp) {
        if (!start) start = timestamp;
        let progress = timestamp - start;
        let opacity = Math.min(progress / duration, 1);
        element.style.opacity = opacity;

        if (progress < duration) {
            requestAnimationFrame(animate);
        } else if (callback) {
            callback();
        }
    }

    setTimeout(() => requestAnimationFrame(animate), delay);
}

function fadeOut(element, duration = 1000) {
    if (!element) return;
    
    let start = null;

    function animate(timestamp) {
        if (!start) start = timestamp;
        let progress = timestamp - start;
        let opacity = Math.max(1 - (progress / duration), 0);
        element.style.opacity = opacity;

        if (progress < duration) {
            requestAnimationFrame(animate);
        } else {
            element.style.display = "none";
        }
    }

    requestAnimationFrame(animate);
}

function fadeOutAllPieces(duration = 1000) {
    const pieces = document.querySelectorAll(".pieceBig");
    pieces.forEach(piece => {
        fadeOut(piece, duration);
    });
}

function showImage() {
    const imageData = localStorage.getItem("uploadedImage");
    const userImage = document.getElementById("userImage");
    
    if (!userImage) return;

    if (imageData) {
        userImage.src = imageData;
        imageUploaded = true;
    }
}

function showQuestions() {
    const ccContainer = document.getElementById("cc-container");
    const ansContainer = document.getElementById("ans-container");
    
    if (!ccContainer || !ansContainer) return;

    ccContainer.style.opacity = "1";
    ccContainer.style.display = "flex";
    ccContainer.style.flexDirection = "column";
    ccContainer.style.alignItems = "flex-start";
    
    ansContainer.style.opacity = "1";
    ansContainer.style.display = "flex";
    ansContainer.style.flexDirection = "column";
    ansContainer.style.alignItems = "flex-start";
    
    const ccElements = document.querySelectorAll('.cc');
    
    ccElements.forEach(element => {
        element.style.opacity = "1";
        element.style.display = "block";
        element.style.zIndex = "4";

        const input = element.querySelector("input");
        if (input) {
            input.readOnly = true
            input.style.backgroundColor = "#260e9d51";
            input.style.border = "1px solid white";
            input.style.borderRadius = "10px";
            input.style.marginTop = "90px";
            input.style.width = "300px";
            input.style.padding = "8px";
            input.style.color = "white";
            input.style.boxSizing = "border-box";
            input.style.transform = "translateX(50%)";
        }

        const label = element.querySelector("label")
        if (label) {
            label.style.position = "absolute";
            label.style.color = "#999";
            label.style.fontSize = "18px";
            label.style.transform = "translate(-50%, -300%)";
            label.style.transition = "0.2s ease all";
            label.style.marginTop = "120px";
            label.style.pointerEvents = "none";
        }
    });
    
    const ansElements = document.querySelectorAll('.ans');
    
    ansElements.forEach(element => {
        element.style.opacity = "1";
        element.style.display = "block";
        element.style.zIndex = "4";
        
        const input = element.querySelector('input');
        if (input) {
            input.style.background = "transparent";
            input.style.border = "none";
            input.style.borderBottom = "1px solid #515151";
            input.style.marginTop = "90px";
            input.style.width = "350px";
            input.style.padding = "8px";
            input.style.color = "white";
            input.style.boxSizing = "border-box";
            input.style.transform = "translateX(50%)";
            if (!input.hasAttribute('data-answer')) {
                input.setAttribute('data-answer', input.value);
            }
            input.value = '';
        }

        const label = element.querySelector("label")
        if (label) {
            label.style.position = "absolute";
            label.style.color = "#999";
            label.style.fontSize = "18px";
            label.style.transform = "translate(-50%, -300%)";
            label.style.transition = "0.2s ease all";
            label.style.marginTop = "120px";
            label.style.pointerEvents = "none";
        }
    });
}

function createBoxes() {
    const cols = 12;
    const rows = 7;
    const overlap = 1;

    const img = document.getElementById("logo");
    if (!img) return;

    const pieceWidth = window.innerWidth / cols;
    const pieceHeight = window.innerHeight / rows;

    const piecesContainer = document.getElementById("pieces-container");
    if (!piecesContainer) return;
    
    piecesContainer.innerHTML = "";
    piecesContainer.style.position = "absolute";
    piecesContainer.style.top = "0";
    piecesContainer.style.left = "0";
    piecesContainer.style.width = "100vw";
    piecesContainer.style.height = "100vh";
    piecesContainer.style.overflow = "hidden";

    let totalPieces = cols * rows;
    let piecesFadedIn = 0;

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const pieceCanvas = document.createElement("canvas");
            pieceCanvas.width = pieceWidth + overlap;
            pieceCanvas.height = pieceHeight + overlap;
            pieceCanvas.style.position = "absolute";
            pieceCanvas.style.left = `${x * pieceWidth - overlap / 2}px`;
            pieceCanvas.style.top = `${y * pieceHeight - overlap / 2}px`;

            const pieceCtx = pieceCanvas.getContext("2d");

            const scale = window.devicePixelRatio || 1;
            pieceCanvas.width = pieceWidth * scale;
            pieceCanvas.height = pieceHeight * scale;
            pieceCanvas.style.width = `${pieceWidth}px`;
            pieceCanvas.style.height = `${pieceHeight}px`;
            pieceCtx.scale(scale, scale);

            pieceCtx.drawImage(
                img,
                (x / cols) * img.naturalWidth,
                (y / rows) * img.naturalHeight,
                img.naturalWidth / cols,
                img.naturalHeight / rows,
                0,
                0,
                pieceWidth + overlap,
                pieceHeight + overlap
            );

            pieceCanvas.classList.add("pieceBig");
            pieceCanvas.style.opacity = 0;
            piecesContainer.appendChild(pieceCanvas);

            const delay = (x + y) * 200;

            fadeIn(pieceCanvas, 1000, delay, () => {
                piecesFadedIn++;
                if (piecesFadedIn === totalPieces) {
                    setTimeout(addBg, 1000);
                    setTimeout(() => fadeOutAllPieces(1000), 1500);
                }
            });
        }
    }
}

function revealPanel(index) {
    const overlays = document.querySelectorAll('.black-overlay');
    if (index < overlays.length && overlays[index]) {
        overlays[index].style.opacity = '0';
        overlays[index].style.zIndex = "4";
        
        const savedRevealedState = localStorage.getItem('revealedState');
        if (savedRevealedState) {
            try {
                const revealedState = JSON.parse(savedRevealedState);
                if (index < revealedState.length) {
                    revealedState[index] = true;
                    localStorage.setItem('revealedState', JSON.stringify(revealedState));
                }
            } catch (e) {
                console.error("Error updating revealed state:", e);
            }
        }
    }
}

function splitImage(img) {
    imageUploaded = true;
    const cols = 5;
    const rows = 5;
    const borderWidth = 1;
    
    const totalWidth = 300;
    const totalHeight = 300;

    const canvas = document.getElementById("canvas");
    if (!canvas) return;
    
    canvas.style.zIndex = "3";
    const ctx = canvas.getContext("2d");
    canvas.width = totalWidth;
    canvas.height = totalHeight;
    
    let sourceImg;
    if (img && img.tagName === 'IMG') {
        sourceImg = img;
    } else {
        sourceImg = document.getElementById("userImage");
        if (!sourceImg) return;
    }
    
    ctx.drawImage(sourceImg, 0, 0, totalWidth, totalHeight);

    const piecesContainer = document.getElementById("mini-pieces-container");
    if (!piecesContainer) return;
    
    piecesContainer.innerHTML = "";
    piecesContainer.style.position = "absolute";
    piecesContainer.style.top = "32%";
    piecesContainer.style.left = "50%";
    piecesContainer.style.width = totalWidth + "px";
    piecesContainer.style.height = totalHeight + "px";
    piecesContainer.style.transform = "translate(-50%, -50%)";
    piecesContainer.style.zIndex = "3";
    piecesContainer.style.display = "grid";
    piecesContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    piecesContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    piecesContainer.style.gap = `${borderWidth}px`;
    piecesContainer.style.backgroundColor = "white";
    piecesContainer.style.padding = "0";
    piecesContainer.style.boxSizing = "border-box";
    piecesContainer.style.transition = "gap 1.5s ease";

    const ccDivs = document.querySelectorAll('.cc');
    const totalQuestions = Math.max(1, ccDivs.length);
    const totalPieces = cols * rows;
    
    let allPieces = [];

    const revealedState = new Array(totalPieces).fill(false);
    localStorage.setItem('revealedState', JSON.stringify(revealedState));
    
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const pieceWrapper = document.createElement("div");
            pieceWrapper.className = "piece-wrap";
            pieceWrapper.style.position = "relative";
            pieceWrapper.style.overflow = "hidden";
            pieceWrapper.style.width = "100%";
            pieceWrapper.style.height = "100%";
            pieceWrapper.style.boxSizing = "border-box";

            const sourceX = Math.round(x * (totalWidth / cols));
            const sourceY = Math.round(y * (totalHeight / rows));
            const sourceWidth = Math.round((x + 1) * (totalWidth / cols) - sourceX);
            const sourceHeight = Math.round((y + 1) * (totalHeight / rows) - sourceY);
            
            const pieceCanvas = document.createElement("canvas");
            pieceCanvas.width = sourceWidth;
            pieceCanvas.height = sourceHeight;
            pieceCanvas.className = "piece";
            pieceCanvas.style.border = "1px solid white";
            pieceCanvas.style.display = "block";
            pieceCanvas.style.width = "100%";
            pieceCanvas.style.height = "100%";
            pieceCanvas.style.zIndex = "3";
            
            const pieceCtx = pieceCanvas.getContext("2d");
            pieceCtx.drawImage(
                canvas,
                sourceX, sourceY,
                sourceWidth, sourceHeight,
                0, 0,
                sourceWidth, sourceHeight
            );
            
            const blackOverlay = document.createElement("div");
            blackOverlay.className = "black-overlay";
            blackOverlay.style.position = "absolute";
            blackOverlay.style.top = "0";
            blackOverlay.style.left = "0";
            blackOverlay.style.width = "100%";
            blackOverlay.style.height = "100%";
            blackOverlay.style.backgroundColor = "black";
            blackOverlay.style.opacity = "1";
            blackOverlay.style.transition = "opacity 1s ease";
            blackOverlay.style.zIndex = "10";
    
            pieceWrapper.appendChild(pieceCanvas);
            pieceWrapper.appendChild(blackOverlay);
            piecesContainer.appendChild(pieceWrapper);

            allPieces.push({
                wrapper: pieceWrapper,
                canvas: pieceCanvas,
                overlay: blackOverlay,
                index: y * cols + x
            });
        }
    }
    
    setupAnswerListeners(allPieces, totalQuestions);
}

function convergeImage() {
    const piecesContainer = document.getElementById("mini-pieces-container");
    const pieces = document.getElementsByClassName("piece");
    if (!piecesContainer) return;

    piecesContainer.style.boxShadow = "0 0 20px 5px rgba(255, 255, 255, 0.8)";
    
    setTimeout(() => {
        for (let i = 0; i < pieces.length; i++) {
            pieces[i].style.border = "none";
        }

        piecesContainer.style.gap = "0px";
        piecesContainer.style.transform = "translate(-50%, -50%) scale(1.05)";
        
        showCongratulations();
    }, 800);
}

function showCongratulations() {
    const congrats = document.createElement("div");
    congrats.className = "congratulations";
    congrats.style.position = "absolute";
    congrats.style.top = "55%";
    congrats.style.left = "50%";
    congrats.style.transform = "translate(-50%, -50%)";
    congrats.style.color = "white";
    congrats.style.fontSize = "24px";
    congrats.style.fontWeight = "bold";
    congrats.style.textAlign = "center";
    congrats.style.zIndex = "20";
    congrats.style.opacity = "0";
    congrats.style.transition = "opacity 1s ease";
    congrats.style.textShadow = "0 0 10px rgba(255, 255, 255, 0.8)";
    congrats.innerText = "Puzzle Complete!";
    
    document.body.appendChild(congrats);
    
    setTimeout(() => {
        congrats.style.opacity = "1";
        
        setTimeout(() => {
            congrats.style.opacity = "0";
            setTimeout(() => congrats.remove(), 1000);
        }, 3000);
    }, 500);
}

function checkAllAnswersCorrect() {
    const ansInputs = document.querySelectorAll('.ans input');
    const ccInputs = document.querySelectorAll('.cc input');
    
    if (!ansInputs.length || !ccInputs.length) return false;
    
    let totalQuestions = ccInputs.length;
    let correctAnswers = 0;
    
    ansInputs.forEach((input, index) => {
        if (index < ccInputs.length) {
            const expectedAnswer = input.getAttribute('data-answer') || 
                                  (ccInputs[index] ? ccInputs[index].value.trim().toLowerCase() : '');
            
            if (expectedAnswer && input.value.trim().toLowerCase() === expectedAnswer) {
                correctAnswers++;
            }
        }
    });
    
    return correctAnswers === totalQuestions;
}

function setupAnswerListeners(allPieces, totalQuestions) {
    const totalPieces = allPieces.length;
    
    let pieceIndices = Array.from({ length: totalPieces }, (_, i) => i);
    shuffleArray(pieceIndices);
    
    const piecesPerQuestion = Math.ceil(totalPieces / totalQuestions);
    
    const ansInputs = document.querySelectorAll('.ans input');
    const ccInputs = document.querySelectorAll('.cc input');
    
    ansInputs.forEach((input, index) => {
        const questionInput = ccInputs[index];
        if (questionInput && !input.hasAttribute('data-answer')) {
            input.setAttribute('data-answer', questionInput.value.trim().toLowerCase());
        }
        
        input.addEventListener('input', function() {
            const expectedAnswer = this.getAttribute('data-answer') || 
            (questionInput ? questionInput.value.trim().toLowerCase() : '');
            
            if (expectedAnswer && this.value.trim().toLowerCase() === expectedAnswer) {
                this.value = expectedAnswer;
                
                const startIdx = index * piecesPerQuestion;
                const endIdx = Math.min(startIdx + piecesPerQuestion, totalPieces);
                
                for (let i = startIdx; i < endIdx; i++) {
                    if (i < pieceIndices.length) {
                        const randomPieceIdx = pieceIndices[i];
                        if (randomPieceIdx < allPieces.length && allPieces[randomPieceIdx].overlay) {
                            allPieces[randomPieceIdx].overlay.style.opacity = "0";
                            
                            updateRevealedState(randomPieceIdx, true);
                        }
                    }
                }
                
                this.classList.add('correct');
                this.disabled = true;

                if (checkAllAnswersCorrect()) {
                    convergeImage();
                }
            }
        });
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function checkAllSavedAnswers() {
    const ansInputs = document.querySelectorAll('.ans input');
    const ccInputs = document.querySelectorAll('.cc input');
    
    if (!ansInputs.length || !ccInputs.length) return;
    
    const totalQuestions = ccInputs.length;
    const totalPieces = 25;
    const piecesPerQuestion = Math.ceil(totalPieces / totalQuestions);
    
    let pieceIndices = Array.from({ length: totalPieces }, (_, i) => i);
    shuffleArray(pieceIndices);
    
    let allCorrect = true;

    ansInputs.forEach((input, index) => {
        if (index < ccInputs.length) {
            const questionInput = ccInputs[index];
            const expectedAnswer = input.getAttribute('data-answer') || 
            (questionInput ? questionInput.value.trim().toLowerCase() : '');
            
            if (expectedAnswer && input.value.trim().toLowerCase() === expectedAnswer) {
                const startIdx = index * piecesPerQuestion;
                const endIdx = Math.min(startIdx + piecesPerQuestion, totalPieces);
                
                for (let i = startIdx; i < endIdx; i++) {
                    if (i < pieceIndices.length) {
                        revealPanel(pieceIndices[i]);
                    }
                }
                
                input.classList.add('correct');
                input.disabled = true;
            } else {
                allCorrect = false;
            }
        }
    });
    
    if (allCorrect && ansInputs.length > 0) {
        convergeImage();
    }
    
    return allCorrect;
}

function loadSavedState() {
    console.log("Loading saved state...");
    const savedCcData = localStorage.getItem('ccData');
    const savedAnsData = localStorage.getItem('ansData');
    const link = document.getElementById("pageLink");
    const shareText = document.getElementById("sharePrompt")
    shareText.style.opacity = 1;
    link.style.opacity = 1;
    
    if (savedCcData && savedAnsData) {
        try {
            const ccContainer = document.getElementById('cc-container');
            const ansContainer = document.getElementById('ans-container');
            
            if (ccContainer) {
                ccContainer.innerHTML = JSON.parse(savedCcData).join('');
                console.log("Questions loaded:", ccContainer.children.length);
            }
            
            if (ansContainer) {
                ansContainer.innerHTML = JSON.parse(savedAnsData).join('');
                console.log("Answers loaded:", ansContainer.children.length);
                
                const ansInputs = ansContainer.querySelectorAll('input');
                ansInputs.forEach(input => {
                    input.setAttribute('data-answer', input.value.trim().toLowerCase());
                    input.value = '';
                });
            }
            
            showQuestions();
            
            const imageData = localStorage.getItem("uploadedImage");
            if (imageData) {
                imageUploaded = true;
                const userImage = document.getElementById("userImage");
                if (userImage) {
                    userImage.src = imageData;
                    console.log("Image loaded");
                    
                    userImage.onload = function() {
                        splitImage(userImage);
                    };
                }
            }
        } catch (e) {
            console.error("Error loading saved state:", e);
        }
    } else {
        console.error("No saved data found in localStorage");
    }
}

function updateRevealedState(index, isRevealed) {
    const savedRevealedState = localStorage.getItem('revealedState');
    if (savedRevealedState) {
        try {
            const revealedState = JSON.parse(savedRevealedState);
            if (index < revealedState.length) {
                revealedState[index] = isRevealed;
                localStorage.setItem('revealedState', JSON.stringify(revealedState));
            }
        } catch (e) {
            console.error("Error updating revealed state:", e);
        }
    }
}

function applyRevealedState() {
    const savedRevealedState = localStorage.getItem('revealedState');
    if (savedRevealedState) {
        try {
            const revealedState = JSON.parse(savedRevealedState);
            const overlays = document.querySelectorAll('.black-overlay');
            let allRevealed = true;
            
            revealedState.forEach((isRevealed, index) => {
                if (isRevealed && index < overlays.length) {
                    overlays[index].style.opacity = "0";
                } else if (index < overlays.length) {
                    allRevealed = false;
                }
            });
            
            if (allRevealed && overlays.length > 0) {
                    setTimeout(() => {
                        if (checkAllAnswersCorrect()) {
                            convergeImage();
                        }
                    }, 1000);
                }
            }
         catch (e) {
            console.error("Error applying revealed state:", e);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");
    const img = document.getElementById("logo");
    
    setTimeout(loadSavedState, 8000)
    
    if (img) {
        if (!img.complete || img.naturalWidth === 0) {
            img.onload = createBoxes;
        } else {
            createBoxes();
        }
    }

    setTimeout(applyRevealedState, 8000);
});
