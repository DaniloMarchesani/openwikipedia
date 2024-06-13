const cleanText = (text: string): string => {
    return text
    .replace(/\([^)]*\)/g, '') // Rimuove tutto il contenuto tra parentesi tonde
    .replace(/\[[^\]]*\]/g, '') // Rimuove tutto il contenuto tra parentesi quadre
    .trim(); // Rimuove eventuali spazi bianchi all'inizio e alla fine
}

export default cleanText;