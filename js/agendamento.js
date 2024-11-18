const availableSlots = document.getElementById('available-slots');
const bookedSlots = document.getElementById('booked-slots');
const modal = document.getElementById('modal');
const reasonInput = document.getElementById('reason');
const saveReasonButton = document.getElementById('save-reason');
const closeModalButton = document.getElementById('close-modal');
const daySelector = document.getElementById('day-selector');

let selectedSlotIndex = null;

const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];
const generateSlots = () => {
    const slots = [];
    const today = new Date();

    for (let dayOffset = 1; dayOffset <= 5; dayOffset++) {
        const day = new Date(today);
        day.setDate(today.getDate() + dayOffset);

        if (day.getDay() >= 1 && day.getDay() <= 5) {
            const dayName = daysOfWeek[day.getDay()];

            for (let hour = 9; hour < 15; hour++) {
                const slotStart = new Date(day);
                slotStart.setHours(hour, 0, 0, 0);

                const slotEnd = new Date(day);
                slotEnd.setHours(hour + 1, 0, 0, 0);

                slots.push({
                    day: dayName,
                    slot: `${slotStart.getDate()}/${slotStart.getMonth() + 1} - ${hour}:00 - ${hour}:30`,
                    dayIndex: day.getDay(),
                    fullDate: slotStart
                });

                slots.push({
                    day: dayName,
                    slot: `${slotStart.getDate()}/${slotStart.getMonth() + 1} - ${hour}:30 - ${hour + 1}:00`,
                    dayIndex: day.getDay(),
                    fullDate: slotEnd
                });
            }
        }
    }
    return slots;
};

let availableTimes = generateSlots();
let bookedTimes = [];

const renderAvailableSlots = (dayIndex) => {
    availableSlots.innerHTML = '';
    const filteredSlots = availableTimes.filter(slot => slot.dayIndex === dayIndex);
    filteredSlots.forEach((slot, index) => {
        const li = document.createElement('li');
        li.textContent = `${slot.day} - ${slot.slot} `;
        const bookButton = document.createElement('button');
        bookButton.textContent = 'Agendar';
        bookButton.onclick = () => openModal(availableTimes.indexOf(slot));
        li.appendChild(bookButton);
        availableSlots.appendChild(li);
    });
};

const renderBookedSlots = () => {
    bookedSlots.innerHTML = '';
    bookedTimes.forEach((appointment, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${appointment.slot}`;
        const p = document.createElement('p');
        p.textContent = `Motivo: ${appointment.reason}`;
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancelar';
        cancelButton.classList.add('cancel');
        cancelButton.onclick = () => cancelSlot(index);
        li.appendChild(p);
        li.appendChild(cancelButton);
        bookedSlots.appendChild(li);
    });
};

const openModal = (index) => {
    selectedSlotIndex = index;
    modal.classList.remove('hidden');
};

const closeModal = () => {
    modal.classList.add('hidden');
    reasonInput.value = '';
    selectedSlotIndex = null;
};

const saveReason = () => {
    const reason = reasonInput.value.trim();
    if (reason) {
        const slot = availableTimes.splice(selectedSlotIndex, 1)[0];
        bookedTimes.push({ 
            slot: slot.slot, 
            reason, 
            fullDate: slot.fullDate, 
            day: slot.day 
        });
        closeModal();
        renderAvailableSlots(parseInt(daySelector.value));
        renderBookedSlots();
    } else {
        alert('Por favor, insira um motivo para o agendamento.');
    }
};

const cancelSlot = (index) => {
    const appointment = bookedTimes.splice(index, 1)[0];
    availableTimes.push({
        day: appointment.day,
        slot: appointment.slot,
        fullDate: appointment.fullDate,
        dayIndex: appointment.fullDate.getDay()
    });
    availableTimes.sort((a, b) => a.fullDate - b.fullDate);
    renderAvailableSlots(parseInt(daySelector.value));
    renderBookedSlots();
};

daySelector.addEventListener('change', (e) => {
    const dayIndex = parseInt(e.target.value);
    if (dayIndex >= 1 && dayIndex <= 5) {
        renderAvailableSlots(dayIndex);
    } else {
        availableSlots.innerHTML = '';
    }
});

renderBookedSlots();
saveReasonButton.addEventListener('click', saveReason);
closeModalButton.addEventListener('click', closeModal);
