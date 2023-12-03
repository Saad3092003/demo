import AOS from 'aos';
import 'aos/dist/aos.css';
import 'aos/dist/aos.js';

AOS.init({
    disableMutationObserver: false,
    debounceDelay: 50,
    throttleDelay: 99,
    once: true,
});

export default AOS;
