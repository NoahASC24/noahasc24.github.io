    const fileInput = document.getElementById("example");
    const finishButton = document.getElementById("finish");
    let imageUploaded = false;
    var i = 0;
    let offset = 1.5;
    const spacing = 20;

    function fadeIn(element, duration = 1000, delay = 0, callback = null) {
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

    function moveImg() {
        const logoimg = document.getElementById("logoimg");

        logoimg.style.transition = "top 0.5s ease";
        logoimg.style.top = "300px";
    }

    function showButton() {
        const div = document.getElementById("create");

        div.style.opacity = 1;
    }

    function addBg() {
        const background = document.getElementById("background");
        const logoimg = document.getElementById("logoimg");

        background.style.opacity = 1;
        logoimg.style.opacity = 1;
        setTimeout(moveImg, 2000);
        setTimeout(showButton, 2500);
    }

    function fadeOut(element, duration = 1000) {
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

    function createboxes() {
        const cols = 12;
        const rows = 7;
        const overlap = 1;

        const img = document.getElementById("logo");

        if (!img.complete || img.naturalWidth === 0) {
            img.onload = createboxes;
            return;
        }

        const pieceWidth = window.innerWidth / cols;
        const pieceHeight = window.innerHeight / rows;

        const piecesContainer = document.getElementById("pieces-container");
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

    window.addEventListener("load", () => {
        setTimeout(createboxes, 3000);
    });

document.addEventListener("DOMContentLoaded", function() {
        const createButton = document.getElementById("create");
        if (createButton) {
            createButton.addEventListener("click", function() {
                const button = document.getElementById("create");
                const logo = document.getElementById("logoimg");
                const question = document.getElementById("clone-container");
                const example = document.getElementById("example");
                const exampleButton = document.getElementById("exampleButton");
                const appendButton = document.getElementById("append");
                const finish = document.getElementById("finish");

                button.style.opacity = 0;
                example.style.display = "block";
                logo.style.transition = "top 1s ease, transform 1s ease";
                logo.style.top = "50px";
                logo.style.transform = "translate(-50%, -50%) scale(0.6)";
                question.style.opacity = 1;
                question.style.pointerEvents = "auto";
                exampleButton.style.opacity = 1;
                exampleButton.disabled = false;
                appendButton.style.opacity = 1;
                finish.style.opacity = 1;
            });
        }

        const exampleButton = document.getElementById("exampleButton");
        if (exampleButton) {
            exampleButton.addEventListener("click", function() {
                document.getElementById("example").click();
            });
        }
        
    const ccContainer = document.getElementById("cc0");
    const ansContainer = document.getElementById("ans0");
    
    if (ccContainer && !ccContainer.querySelector('.error-message')) {
        const errorMsg = document.createElement("p");
        errorMsg.className = "error-message";
        errorMsg.id = "cc0-error";
        errorMsg.textContent = "No question provided";
        errorMsg.style.color = "red";
        errorMsg.style.opacity = "0";
        errorMsg.style.transition = "opacity 0.5s ease";
        errorMsg.style.margin = "5px 0";
        ccContainer.appendChild(errorMsg);
    }
    
    if (ansContainer && !ansContainer.querySelector('.error-message')) {
        const errorMsg = document.createElement("p");
        errorMsg.className = "error-message";
        errorMsg.id = "ans0-error";
        errorMsg.textContent = "No answer provided";
        errorMsg.style.color = "red";
        errorMsg.style.opacity = "0";
        errorMsg.style.transition = "opacity 0.5s ease";
        errorMsg.style.margin = "5px 0";
        ansContainer.appendChild(errorMsg);
    }
    
  const appendButton = document.getElementById("append");
        if (appendButton) {
            appendButton.addEventListener("click", function () {
                const original = document.getElementById("cc0");
                const answer = document.getElementById("ans0");
                const container = document.getElementById("clone-container");
                const finish = document.getElementById("finish");

                if (!original || !answer || !container || !finish) return;

                const dupe = original.cloneNode(true);
                const dupe2 = answer.cloneNode(true);
                i++;
                dupe.id = "cc" + i;
                dupe.classList.add("cc");
                dupe2.id = "ans" + i;
                dupe2.classList.add("ans");

                const dupedInput = dupe.querySelector('input');
                if (dupedInput) {
                    dupedInput.value = "";
                    dupedInput.disabled = false;
                }

                const dupedInput2 = dupe2.querySelector('input');
                if (dupedInput2) {
                    dupedInput2.value = "";
                    dupedInput2.removeAttribute("value");
                    dupedInput2.classList.remove("correct");
                    dupedInput2.disabled = false;
                }

                offset += spacing;
                dupe.style.top = `calc(${offset}vh)`;
                dupe2.style.top = `${offset + 10}vh`;
                appendButton.style.top = `${offset + 20}vh`;
                finish.style.top = `${offset + 30}vh`;

                container.appendChild(dupe);
                container.appendChild(dupe2);

                setTimeout(() => {
                const newCcContainer = document.getElementById("cc" + i);
                const newAnsContainer = document.getElementById("ans" + i);
                
                if (newCcContainer && !newCcContainer.querySelector('.error-message')) {
                    const errorMsg = document.createElement("p");
                    errorMsg.className = "error-message";
                    errorMsg.id = "cc" + i + "-error";
                    errorMsg.textContent = "No question provided";
                    errorMsg.style.color = "red";
                    errorMsg.style.opacity = "0";
                    errorMsg.style.transition = "opacity 0.5s ease";
                    errorMsg.style.margin = "5px 0";
                    newCcContainer.appendChild(errorMsg);
                }
                
                if (newAnsContainer && !newAnsContainer.querySelector('.error-message')) {
                    const errorMsg = document.createElement("p");
                    errorMsg.className = "error-message";
                    errorMsg.id = "ans" + i + "-error";
                    errorMsg.textContent = "No answer provided";
                    errorMsg.style.color = "red";
                    errorMsg.style.opacity = "0";
                    errorMsg.style.transition = "opacity 0.5s ease";
                    errorMsg.style.margin = "5px 0";
                    newAnsContainer.appendChild(errorMsg);
                }
            }, 100);
            });
        }
    
    const finishButton = document.getElementById("finish");
    if (finishButton) {
        finishButton.addEventListener("click", function() {
            if (!imageUploaded) {
                const imgStatus = document.getElementById("imgStatus");
                if (imgStatus) {
                    imgStatus.style.opacity = "1";
                    setTimeout(() => {
                        imgStatus.style.opacity = "0";
                    }, 3000);
                }
                return;
            }

            const ccDivs = document.querySelectorAll('.cc');
            const ansDivs = document.querySelectorAll('.ans');
            let allInputsFilled = true;
            
            document.querySelectorAll('.error-message').forEach(msg => {
                msg.style.opacity = "0";
            });
            
            ccDivs.forEach(div => {
                const input = div.querySelector('input');
                const errorMsg = div.querySelector('.error-message');
                if (input && errorMsg && !input.value.trim()) {
                    errorMsg.style.opacity = "1";
                    allInputsFilled = false;
                    setTimeout(() => {
                        errorMsg.style.opacity = "0";
                    }, 3000);
                }
            });
            
            ansDivs.forEach(div => {
                const input = div.querySelector('input');
                const errorMsg = div.querySelector('.error-message');
                if (input && errorMsg && !input.value.trim()) {
                    errorMsg.style.opacity = "1";
                    allInputsFilled = false;
                    setTimeout(() => {
                        errorMsg.style.opacity = "0";
                    }, 3000);
                }
            });

            if (allInputsFilled && imageUploaded) {
                const ccData = Array.from(ccDivs).map(div => {
                    const input = div.querySelector('input');
                    if (input) {
                        input.setAttribute('value', input.value);
                    }
                    return div.outerHTML;
                });

                const ansData = Array.from(ansDivs).map(div => {
                    const input = div.querySelector('input');
                    if (input) {
                        input.setAttribute('value', input.value);
                    }
                    return div.outerHTML;
                });

                const totalPieces = 25;
                const revealedState = Array(totalPieces).fill(false);
                
                localStorage.setItem('ccData', JSON.stringify(ccData));
                localStorage.setItem('ansData', JSON.stringify(ansData));
                localStorage.setItem('revealedState', JSON.stringify(revealedState));
                window.location.href = "setup.html";
            }
        });
    }
});

    if (fileInput) {
        fileInput.addEventListener("change", function(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem("uploadedImage", e.target.result);
                
                const img = new Image();
                img.onload = function() {
                    splitImage(img);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

function splitImage(img) {
    imageUploaded = true;
    const cols = 5;
    const rows = 5;
    const borderWidth = 1;
    
    const totalWidth = 300;
    const totalHeight = 300;
    
    const cellWidth = totalWidth / cols;
    const cellHeight = totalHeight / rows;

    const pieceWidth = cellWidth - borderWidth;
    const pieceHeight = cellHeight - borderWidth;

    const canvas = document.getElementById("canvas");
    if (!canvas) return;
    
    canvas.style.zIndex = "3";
    const ctx = canvas.getContext("2d");
    canvas.width = totalWidth;
    canvas.height = totalHeight;
    ctx.drawImage(img, 0, 0, totalWidth, totalHeight);

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
            blackOverlay.style.opacity = "0";
            blackOverlay.style.transition = "opacity 1s ease";
            blackOverlay.style.zIndex = "10";
            
            pieceWrapper.appendChild(pieceCanvas);
            pieceWrapper.appendChild(blackOverlay);
            piecesContainer.appendChild(pieceWrapper);
        }
    }
}
