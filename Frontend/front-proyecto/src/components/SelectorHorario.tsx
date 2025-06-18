
import React, { useEffect, useState } from 'react';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import '../styles/selectorhorario.css';

interface selectorHorarioProps {
    horaInicio: Dayjs |  null;
    setHoraInicio: (hora: Dayjs | null) => void;
    horaFin: Dayjs | null;
    setHoraFin: (hora: Dayjs  | null) => void;
}

const SelectorHorario: React.FC<selectorHorarioProps> = ({
    horaInicio,
    setHoraInicio,
    horaFin,
    setHoraFin,
}) => {
    const [error, setError] = useState<string | null>(null);

    useEffect(()=> {
        if(!horaInicio || !horaFin)
        {
            setError('seleccione ambas horas')
        } else if (horaFin && horaInicio && horaFin.isBefore(horaInicio)){
            setError('la hora de termino debe ser posterior a la de inicio');
        } else {
            setError(null);
        }
    }, [horaInicio, horaFin])


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="selector-horario-container">
                <div className="selector-horario-row">
                    <TimePicker label="Hora inicio" value={horaInicio} onChange={setHoraInicio} ampm={false}
                     className="selector-horario-picker"
                     slotProps={{
                        textField: {
                            error: Boolean(error) && !horaInicio,
                            helperText: !horaInicio ? 'Requerido' : '',
                        }
                     }}/>
                    <TimePicker label="Hora termino" value={horaFin} onChange={setHoraFin} ampm={false}
                     className="selector-horario-picker"
                     slotProps={{
                        textField: {
                            error: Boolean(error) && (!!horaInicio && !!horaFin && horaFin.isBefore(horaInicio)),
                            helperText: !horaFin ? 'Requerido' : horaInicio && horaFin && horaFin.isBefore(horaInicio) ? 'Debe ser posterior a inicio' : '',
                        },
                     }}
                    />
                </div>
                {error && <div className="selector-horario-error">{error}</div>}
            </div>
        </LocalizationProvider>
    );
};

export default SelectorHorario;