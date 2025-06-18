import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import '../styles/vistapdf.css';

interface Prueba {
    id_asignatura: number;
    asignatura: string;
    nivel: number;
    horario: string;
    profesores: string[];
    salas: string[]
    celdaid: string; 
}

interface Props {
    calendario: Record<string, Prueba[]>;
    fechas: { dia: number; fecha: Date | null }[];
    onClose: () => void;
    nombreCalendario: string;
    mostrardiaextra: boolean;
}


const VistaPDF: React.FC<Props> = ({calendario, fechas, onClose, nombreCalendario, mostrardiaextra}) => {
    const previewPdf = useRef<HTMLDivElement>(null);

    const descargarPdf = async () => {
        if(!previewPdf.current)
        {
            return;
        }

        const canvas = await html2canvas(previewPdf.current, { scale: 2 });
        const imgdata = canvas.toDataURL("image/png");

        const pdf = new jsPDF("landscape", "pt", "a4");
        const imgAncho = 800;
        const imgAlto = canvas.height * imgAncho / canvas.width;

        pdf.addImage(imgdata, "PNG", 40, 40, imgAncho, imgAlto);
        pdf.save(`calendario_${nombreCalendario || 'sin_nombre'}.pdf`);

    };

    const fechasvisibles = mostrardiaextra ? fechas: fechas.filter(f => f.dia !== 7);

    return(
        <div className="modal-overlay">
            <div className="modal-grande">
                <h2>Vista previa del calendario: {nombreCalendario}</h2>
                <div ref={previewPdf} className="pdf-preview-content">
                    <div className="pdf-grid">
                        <div className="pdf-row pdf-header">
                            <div className="pdf-cell pdf-time-slot">Bloque/Hora</div>
                            {fechasvisibles.map((f) => (
                            <div key={f.dia} className="pdf-cell pdf-day-header">
                                {f.fecha?.toLocaleDateString("es-CL", { weekday: 'long', day: '2-digit', month: '2-digit' }) ?? `Día ${f.dia}`}
                            </div>
                            ))}
                        </div>

                        {["Mañana", "Tarde"].map((bloque) => (
                            <React.Fragment key={bloque}>
                            {[1, 2, 3, 4, 5, 6].map((slot) => (
                                <div className="pdf-row" key={`${bloque}-slot${slot}`}>
                                <div className="pdf-cell pdf-time-slot">{slot === 1 ? bloque : ""}</div>
                                {fechasvisibles.map((f) => {
                                    const celdaid = `${f.dia}-${bloque}-slot${slot}`;
                                    const pruebas = calendario[celdaid] || [];
                                    return (
                                    <div className="pdf-cell pdf-slot" key={celdaid}>
                                        {pruebas.map((prueba, i) => (
                                        <div className="pdf-prueba-box" key={i}>
                                            <div><strong>Sem.:</strong> {prueba.nivel}</div>
                                            <div><strong>Asig:</strong> {prueba.asignatura}</div>
                                            <div><strong>Horario:</strong> {prueba.horario}</div>
                                            <div><strong>Prof:</strong> {prueba.profesores.join(", ")}</div>
                                            <div><strong>Sala:</strong> {prueba.salas.join(", ")}</div>
                                        </div>
                                        ))}
                                    </div>
                                    );
                                })}
                                </div>
                            ))}
                            </React.Fragment>
                        ))}
                        </div>
                </div>
                <div className="acciones-modal">
                    <button onClick={descargarPdf}>Descargar pdf</button>
                    <button onClick={onClose}>cerrar</button>
                </div>
            </div>
        </div>
    );
}

export default VistaPDF;