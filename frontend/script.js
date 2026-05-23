
const currencyDropdown = document.getElementById('currency-selector');
const carForm = document.getElementById('car-form');
const searchBtn = document.getElementById('search-btn');
const resultsContainer = document.getElementById('results-container');
const showroomSection = document.getElementById('showroom'); 

const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.scroll-animate').forEach(el => scrollObserver.observe(el));

const budgetInput = document.getElementById('budget');
const mileageInput = document.getElementById('mileage');

const currencyData = [
    { code: "INR", symbol: "₹" }, { code: "USD", symbol: "$" }, { code: "EUR", symbol: "€" },
    { code: "GBP", symbol: "£" }, { code: "JPY", symbol: "¥" }, { code: "AUD", symbol: "$" },
    { code: "CAD", symbol: "$" }, { code: "CHF", symbol: "CHF" }, { code: "CNY", symbol: "¥" },
    { code: "AED", symbol: "د.إ" }, { code: "SGD", symbol: "$" }, { code: "ZAR", symbol: "R" },
    { code: "BRL", symbol: "R$" }, { code: "MXN", symbol: "$" }, { code: "KRW", symbol: "₩" }
];

const globalBrands = [
    "Abarth", "Acura", "Alfa Romeo", "Alpine", "Aston Martin", "Audi", "Bentley", 
    "BMW", "Bugatti", "Buick", "BYD", "Cadillac", "Chevrolet", "Chrysler", "Citroën", 
    "Dacia", "Dodge", "Ferrari", "Fiat", "Ford", "Genesis", "GMC", "Honda", "Hyundai", 
    "Infiniti", "Jaguar", "Jeep", "Kia", "Koenigsegg", "Lamborghini", "Lancia", 
    "Land Rover", "Lexus", "Lincoln", "Lotus", "Lucid", "Maserati", "Maybach", "Mazda", "McLaren", 
    "Mercedes-Benz", "MG", "MINI", "Mitsubishi", "Nissan", "Pagani", "Peugeot", 
    "Polestar", "Porsche", "Ram", "Renault", "Rimac", "Rivian", "Rolls-Royce", "Skoda", 
    "Subaru", "Suzuki", "Tata", "Tesla", "Toyota", "Volkswagen", "Volvo"
];

const comprehensiveColors = [
    "Alpine White", "Arctic White", "Pearl White", "Solid Black", "Metallic Black", "Matte Black", 
    "Obsidian Black", "Gunmetal Grey", "Nardo Grey", "Silver Metallic", "Racing Red", "Crimson Red", 
    "Cobalt Blue", "Navy Blue", "Midnight Blue", "British Racing Green", "Emerald Green", 
    "Speed Yellow", "Sunset Orange", "Copper", "Bronze", "Champagne", "Midnight Purple"
];

const origins = [
    "German", "Italian", "Japanese (JDM)", "American", "British", 
    "Indian", "South Korean", "French", "Swedish", "Chinese"
];

const bodyTypes = [
    "Sedan", "SUV", "Coupe", "Sports Car", "Hatchback", "Convertible", 
    "Pickup Truck", "Wagon / Estate", "Minivan", "Crossover", "Hypercar"
];

currencyDropdown.innerHTML = ''; 
currencyData.forEach(currency => {
    const option = document.createElement('option');
    option.value = currency.code;
    option.textContent = `${currency.code} (${currency.symbol})`;
    if (currency.code === "INR") option.selected = true; 
    currencyDropdown.appendChild(option);
});

function setupCustomCombobox(inputId, dataArray) {
    const input = document.getElementById(inputId);
    const parent = input.parentElement;
    
    const list = document.createElement('ul');
    list.className = 'combo-list';
    parent.appendChild(list);

    function renderList(items) {
        list.innerHTML = '';
        if (items.length === 0) {
            list.style.display = 'none';
            return;
        }
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            li.addEventListener('mousedown', (e) => {
                e.preventDefault(); 
                input.value = item;
                list.style.display = 'none';
            });
            list.appendChild(li);
        });
        list.style.display = 'block';
    }

    input.addEventListener('focus', () => {
        const val = input.value.toLowerCase();
        const filtered = dataArray.filter(item => item.toLowerCase().includes(val));
        renderList(filtered.length > 0 ? filtered : dataArray);
    });

    input.addEventListener('input', () => {
        const val = input.value.toLowerCase();
        const filtered = dataArray.filter(item => item.toLowerCase().includes(val));
        renderList(filtered);
    });

    input.addEventListener('blur', () => {
        list.style.display = 'none';
    });
}

setupCustomCombobox('brand', globalBrands);
setupCustomCombobox('color', comprehensiveColors);
setupCustomCombobox('origin', origins);
setupCustomCombobox('body-type', bodyTypes);

carForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const currency = currencyDropdown.value;
    const budget = budgetInput.value;
    const bodyType = document.getElementById('body-type').value.trim() || "car";
    const origin = document.getElementById('origin').value.trim() || "Any";
    const mileage = mileageInput.value || "Not specified";
    const color = document.getElementById('color').value.trim() || "Any";
    const brand = document.getElementById('brand').value.trim() || "Any brand";

    const generatedPrompt = `I am looking for a ${color !== 'Any' ? color : ''} ${origin !== 'Any' ? origin : ''} ${bodyType}. My maximum budget is ${budget} ${currency}. Preferred Brand: ${brand}. Minimum Mileage requirement: ${mileage}.`;

    searchBtn.textContent = "Analyzing Global Market...";
    searchBtn.disabled = true; 
    
    showroomSection.style.display = 'none';
    resultsContainer.innerHTML = ''; 

    try {
        const encodedCurrency = encodeURIComponent(currency);
        const encodedPrompt = encodeURIComponent(generatedPrompt);
        
        const response = await fetch(`http://localhost:8080/api/broker/search?currency=${encodedCurrency}&prompt=${encodedPrompt}`);
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const rawData = await response.text();
        const cars = JSON.parse(rawData);

        cars.forEach((car, index) => {
            const card = document.createElement('div');
            card.className = 'car-card immersive-card scroll-animate';
            
            card.style.transitionDelay = `${index * 0.1}s`;

            const featuresHtml = car.features.map(f => `<li><span style="color: #4facfe;">✦</span> ${f}</li>`).join('');
            const considerationsHtml = car.considerations.map(c => `<li><span style="color: #f39c12;">💡</span> ${c}</li>`).join('');

            // Using opacity='0' on error ensures the broken image icon vanishes beautifully
            card.innerHTML = `
                <div class="background-slider" id="bg-slider-${index}">
                    <img src="${car.imgExterior || ''}" class="bg-img active" alt="" onerror="this.style.opacity='0'">
                    <img src="${car.imgInterior || ''}" class="bg-img" alt="" onerror="this.style.opacity='0'">
                    <img src="${car.imgRims || ''}" class="bg-img" alt="" onerror="this.style.opacity='0'">
                    <div class="gradient-overlay"></div>
                </div>

                <div class="content-layer">
                    <div class="card-header">
                        <h3 class="car-name">${car.name}</h3>
                        <span class="car-price">${car.price}</span>
                    </div>
                    <p class="car-verdict">"${car.verdict}"</p>
                    
                    <div class="car-details">
                        <div class="pros-cons features-list">
                            <h4>Premium Features</h4>
                            <ul>${featuresHtml}</ul>
                        </div>
                        <div class="pros-cons considerations-list">
                            <h4>Things to Consider</h4>
                            <ul>${considerationsHtml}</ul>
                        </div>
                    </div>
                    
                    <a href="${car.sourceLink}" target="_blank" rel="noopener noreferrer" class="dealer-btn">
                        View Official Listing ➔
                    </a>
                </div>
            `;
            
            resultsContainer.appendChild(card);
            scrollObserver.observe(card);
        });

        showroomSection.style.display = 'block';
        showroomSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        cars.forEach((_, index) => {
            let currentImg = 0;
            const images = document.querySelectorAll(`#bg-slider-${index} .bg-img`);
            
            if(images.length > 0) {
                setInterval(() => {
                    images[currentImg].classList.remove('active');
                    currentImg = (currentImg + 1) % images.length;
                    images[currentImg].classList.add('active');
                }, 3000); 
            }
        });

    } catch (error) {
        console.error("System Error:", error);
        showroomSection.style.display = 'block';
        resultsContainer.innerHTML = `<p style="color: #ff6b6b; text-align: center; font-size: 1.2rem; margin-top: 50px;">We hit a roadblock parsing the market data. Please verify your API keys.</p>`;
    } finally {
        searchBtn.textContent = "Analyze Market";
        searchBtn.disabled = false;
    }
});