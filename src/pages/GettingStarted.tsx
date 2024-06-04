import AnimatedBg from "@/components/common/AnimatedBg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const GettingStartedPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-bold gradient-text animate-gradient text-transparent mb-14 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Getting Started</h1>
      <div className="flex items-center justify-center flex-col">
          <p className="max-w-xl md:text-left">
            Benvenuti su Open Wikipedia, la tua app definitiva per esplorare,
            scaricare e personalizzare articoli da Wikipedia, tutto in modalità
            offline. Progettata per professori, alunni e appassionati di studio di
            gruppo, Open Wikipedia ti permette di portare la conoscenza sempre con
            te.
          </p>
      </div>
        <AnimatedBg />
      <div className="my-10 flex flex-col items-center justify-center max-w-xl">
        <h3 className="text-xl font-semibold mb-6">What's the pro's of using open Wikipedia?</h3>
        <ul className="md:text-left space-y-4">
            <li><span className="font-bold">Ricerca Intuitiva</span>🎉: Trova facilmente gli articoli che ti interessano.</li>
            <li><span className="font-bold">Download Offline</span>📥: Scarica articoli e accedili senza connessione Internet.</li>
            <li><span className="font-bold">Modifica e Personalizza</span>🖊: Modifica le voci nel tuo database locale per adattarle alle tue esigenze.</li>
            <li><span className="font-bold">Gestione Articoli</span>📚: Cancella articoli dal tuo archivio personale per mantenerlo organizzato e aggiornato.</li>
        </ul>
    </div>

    <div className="flex flex-col">
        <Button asChild variant={"link"}><Link to={"/register"}>Iscriviti ora e inizia il tuo viaggio nella conoscenza con Open Wikipedia!🏃‍♂️</Link></Button>
        <Button asChild><Link to={"/register"}>Register now!</Link></Button>
    </div>
   
    </div>
  );
};

export default GettingStartedPage;
