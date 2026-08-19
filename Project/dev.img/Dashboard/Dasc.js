document.addEventListener('DOMContentLoaded', () => {
    const userNameElements = document.querySelectorAll('#display-username, #profile-name');
    const savedUser = localStorage.getItem('devpath_user') || 'Desenvolvedor';
    
    userNameElements.forEach(el => {
        el.textContent = savedUser;
    });

    const monthYearEl = document.querySelector('.cal-month-year');
    const calendarGrid = document.querySelector('.calendar-grid');
    const prevBtn = document.querySelector('.cal-nav-btn:first-of-type');
    const nextBtn = document.querySelector('.cal-nav-btn:last-of-type');

    if (monthYearEl && calendarGrid) {
        let currentDate = new Date();

        function renderCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();

            const monthsNames = [
                'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
            ];

            monthYearEl.textContent = `${monthsNames[month]} ${year}`;

            const dayNamesHTML = `
                <span class="cal-day-name">Dom</span>
                <span class="cal-day-name">Seg</span>
                <span class="cal-day-name">Ter</span>
                <span class="cal-day-name">Qua</span>
                <span class="cal-day-name">Qui</span>
                <span class="cal-day-name">Sex</span>
                <span class="cal-day-name">Sáb</span>
            `;
            calendarGrid.innerHTML = dayNamesHTML;

            const firstDayIndex = new Date(year, month, 1).getDay();
            const totalDays = new Date(year, month + 1, 0).getDate();
            const prevTotalDays = new Date(year, month, 0).getDate();

            for (let i = firstDayIndex; i > 0; i--) {
                const daySpan = document.createElement('span');
                daySpan.classList.add('cal-day', 'muted');
                daySpan.textContent = prevTotalDays - i + 1;
                calendarGrid.appendChild(daySpan);
            }

            const today = new Date();
            for (let i = 1; i <= totalDays; i++) {
                const daySpan = document.createElement('span');
                daySpan.classList.add('cal-day');
                daySpan.textContent = i;
                daySpan.style.cursor = 'pointer'; // Torna o dia clicável visualmente

                if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                    daySpan.classList.add('active-day');
                }

                // Evento de clique para selecionar o dia no calendário
                daySpan.addEventListener('click', () => {
                    document.querySelectorAll('.cal-day').forEach(d => d.classList.remove('active-day'));
                    daySpan.classList.add('active-day');
                });

                calendarGrid.appendChild(daySpan);
            }
        }

        renderCalendar();

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                renderCalendar();
            });

            nextBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderCalendar();
            });
        }
    }
});