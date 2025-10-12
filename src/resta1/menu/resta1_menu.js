localStorage.clear();
let type = null;
document.getElementById("playButton").classList.add("active");

document.addEventListener("click", function (event) {
    switch(event.target.id){
        case ('homeButton'):{ // 
            window.location.href = "../../logicamente/logicamente.html";
            break;
        }
        case('rulesButton'):{
            document.getElementById('rulesModal').style.display = 'block';
            break;
        }
        case ('standardButton'):{
            type_resta1 = "standard_matrix";
            document.querySelectorAll(".buttonGroup button").forEach(button => {
                button.classList.remove("active");
            });
            document.getElementById("standardButton").classList.add("active");
            break;
        }
        case ('squareButton'):{
            type_resta1 = "square_matrix";
            document.querySelectorAll(".buttonGroup button").forEach(button => {
                button.classList.remove("active");
            });
            document.getElementById("squareButton").classList.add("active");
            break;
        }
        case ('europeanButton'):{
            type_resta1 = "european_matrix";
            document.querySelectorAll(".buttonGroup button").forEach(button => {
                button.classList.remove("active");
            });
            document.getElementById("europeanButton").classList.add("active");
            break;
        }
        case ('asymmetricButton'):{
            type_resta1 = "asymmetric_matrix";
            document.querySelectorAll(".buttonGroup button").forEach(button => {
                button.classList.remove("active");
            });
            document.getElementById("asymmetricButton").classList.add("active");
            break;
        }
        case ('germanButton'):{
            type_resta1 = "german_matrix";
            document.querySelectorAll(".buttonGroup button").forEach(button => {
                button.classList.remove("active");
            });
            document.getElementById("germanButton").classList.add("active");
            break;
        }
        case ('diamondButton'):{
            type_resta1 = "diamond_matrix";
            document.querySelectorAll(".buttonGroup button").forEach(button => {
                button.classList.remove("active");
            });
            document.getElementById("diamondButton").classList.add("active");
            break;
        }
        case ('starButton'):{
            type_resta1 = "star_matrix";
            document.querySelectorAll(".buttonGroup button").forEach(button => {
                button.classList.remove("active");
            });
            document.getElementById("starButton").classList.add("active");
            break;
        }
        case ('piramidButton'):{
            type_resta1 = "piramid_matrix";
            document.querySelectorAll(".buttonGroup button").forEach(button => {
                button.classList.remove("active");
            });
            document.getElementById("piramidButton").classList.add("active");
            break;
        }
        case ('trapezoidButton'):{
            type_resta1 = "trapezoid_matrix";
            document.querySelectorAll(".buttonGroup button").forEach(button => {
                button.classList.remove("active");
            });
            document.getElementById("trapezoidButton").classList.add("active");
            break;
        }
        case ('rhombusButton'):{
            type_resta1 = "rhombus_matrix";
            document.querySelectorAll(".buttonGroup button").forEach(button => {
                button.classList.remove("active");
            });
            document.getElementById("rhombusButton").classList.add("active");
            break;
        }
        case ('snowButton'):{
            type_resta1 = "snow_matrix";
            document.querySelectorAll(".buttonGroup button").forEach(button => {
                button.classList.remove("active");
            });
            document.getElementById("snowButton").classList.add("active");
            break;
        }
        case ('hexagonalButton'):{
            type_resta1 = "hexagonal_matrix";
            document.querySelectorAll(".buttonGroup button").forEach(button => {
                button.classList.remove("active");
            });
            document.getElementById("hexagonalButton").classList.add("active");
            break;
        }
        case ('triangleButton'):{
            type_resta1 = "triangle_matrix";
            document.querySelectorAll(".buttonGroup button").forEach(button => {
                button.classList.remove("active");
            });
            document.getElementById("triangleButton").classList.add("active");
            break;
        }
        case ('playButton'):{
            if (type_resta1 != null){
                localStorage.setItem('type', type_resta1);
                window.location.href = "../jogo/resta1_jogo.html";
            }
            else{
                document.getElementById('boardModal').style.display = 'block';
            }
            break;
        }
        default: // Detects when the close button in clicken in a opened window
        {
            if (event.target.classList.contains('close')) { // Detects when the user clicks on a close button
                document.getElementById('rulesModal').style.display = 'none';
                document.getElementById('boardModal').style.display = 'none';
            }
            else if (event.target == document.getElementById('rulesModal') || event.target == document.getElementById('boardModal')) { // Detects when the user clicks outside the modal
                event.target.style.display = 'none';
            }
        }
    }
});