document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const answer = item.querySelector('.faq-answer');
        const icon = btn.querySelector('.faq-icon');
        const isOpen = item.classList.contains('open');

        // Close all
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
        document.querySelectorAll('.faq-icon').forEach(i => {
            i.classList.remove('open');
            i.classList.add('closed');
        });

        // Open clicked if it was closed
        if (!isOpen) {
            item.classList.add('open');
            answer.style.display = 'block';
            icon.classList.remove('closed');
            icon.classList.add('open');
        }
    });
});