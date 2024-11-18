const availableSlots = document.getElementById('available-slots');
const bookedSlots = document.getElementById('booked-slots');
const modal = document.getElementById('modal');
const reasonInput = document.getElementById('reason');
const saveReasonButton = document.getElementById('save-reason');
const closeModalButton = document.getElementById('close-modal');

let selectedSlotIndex = null;

const generateSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 15; hour++) {
        slots.push(`${hour}:00 - ${hour}:30`);
        slots.push(`${hour}:30 - ${hour + 1}:00`);
    }
    return slots;
};

let availableTimes = generateSlots();
let bookedTimes = [];

const renderAvailableSlots = () => {
    availableSlots.innerHTML = '';
    availableTimes.forEach((slot, index) => {
        const li = document.createElement('li');
        li.textContent = slot;
        const bookButton = document.createElement('button');
        bookButton.textContent = 'Agendar';
        bookButton.onclick = () => openModal(index);
        li.appendChild(bookButton);
        availableSlots.appendChild(li);
    });
};

const renderBookedSlots = () => {
    bookedSlots.innerHTML = '';
    bookedTimes.forEach((appointment, index) => {
        const li = document.createElement('li');
        const p = document.createElement('p')
        li.innerHTML = `<strong>${appointment.slot}</strong>`;
        p.innerHTML = `<span>${appointment.reason}</span>`
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancelar';
        cancelButton.classList.add('cancel');
        cancelButton.onclick = () => cancelSlot(index);
        li.appendChild(p)
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
        bookedTimes.push({ slot, reason });
        closeModal();
        renderAvailableSlots();
        renderBookedSlots();
    } else {
        alert('Por favor, insira um motivo para o agendamento.');
    }
};

const cancelSlot = (index) => {
    const appointment = bookedTimes.splice(index, 1)[0];
    availableTimes.push(appointment.slot);
    availableTimes.sort(); 
    renderAvailableSlots();
    renderBookedSlots();
};

renderAvailableSlots();
renderBookedSlots();

saveReasonButton.addEventListener('click', saveReason);
closeModalButton.addEventListener('click', closeModal);
