// Help overlay functionality
const helpLink = document.getElementById('helpLink');
const helpOverlay = document.getElementById('helpOverlay');
const closeHelp = document.getElementById('closeHelp');

helpLink.addEventListener('click', () => {
    helpOverlay.style.display = 'flex';
});

closeHelp.addEventListener('click', () => {
    helpOverlay.style.display = 'none';
});

helpOverlay.addEventListener('click', (e) => {
    if (e.target === helpOverlay) {
        helpOverlay.style.display = 'none';
    }
});

// Formula overlay functionality
const formulaLink = document.getElementById('formulaLink');
const formulaOverlay = document.getElementById('formulaOverlay');
const closeFormula = document.getElementById('closeFormula');

formulaLink.addEventListener('click', () => {
    formulaOverlay.style.display = 'flex';
});

closeFormula.addEventListener('click', () => {
    formulaOverlay.style.display = 'none';
});

formulaOverlay.addEventListener('click', (e) => {
    if (e.target === formulaOverlay) {
        formulaOverlay.style.display = 'none';
    }
});

// Calculation function
document.getElementById('calculateBtn').addEventListener('click', () => {
    // Get all input values
    const inputs = {
        x: {
            top: parseFloat(document.getElementById('x-top').value) || 0,
            middle: parseFloat(document.getElementById('x-middle').value) || 0,
            bottom: parseFloat(document.getElementById('x-bottom').value) || 0
        },
        y: {
            top: parseFloat(document.getElementById('y-top').value) || 0,
            middle: parseFloat(document.getElementById('y-middle').value) || 0,
            bottom: parseFloat(document.getElementById('y-bottom').value) || 0
        },
        z: {
            top: parseFloat(document.getElementById('z-top').value) || 0,
            middle: parseFloat(document.getElementById('z-middle').value) || 0,
            bottom: parseFloat(document.getElementById('z-bottom').value) || 0
        }
    };

    // Get current shrinkage values (convert from percentage to decimal)
    const currentXY = (parseFloat(document.getElementById('current-xy').value) || 100) / 100;
    const currentZ = (parseFloat(document.getElementById('current-z').value) || 100) / 100;

    // Calculate averages for each axis
    const xAvg = (inputs.x.top + inputs.x.middle + inputs.x.bottom) / 3;
    const yAvg = (inputs.y.top + inputs.y.middle + inputs.y.bottom) / 3;
    const zAvg = (inputs.z.top + inputs.z.middle + inputs.z.bottom) / 3;

    // Divide by 20 as specified
    const xShrinkage = xAvg / 20;
    const yShrinkage = yAvg / 20;
    const zShrinkage = zAvg / 20;

    // Calculate XY Shrinkage (average of X and Y) and apply current XY adjustment
    const xyShrinkage = ((xShrinkage + yShrinkage) / 2) * currentXY;

    // Apply current Z adjustment
    const adjustedZShrinkage = zShrinkage * currentZ;

    // Display results as percentages (multiplying by 100 and adding % symbol)
    document.getElementById('xyResult').textContent = (xyShrinkage * 100).toFixed(2) + '%';
    document.getElementById('zResult').textContent = (adjustedZShrinkage * 100).toFixed(2) + '%';
});
