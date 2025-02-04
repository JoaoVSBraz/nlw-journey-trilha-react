import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InviteGuestsModal from './invite-trip-modal';
import ConfirmTripModal from './confirm-trip-modal';
import DestinationAndDateInput from './destination-and-date-input';
import InviteGuestsInput from './invite-guests-input';
import { DateRange } from 'react-day-picker';
import { api } from '../../config/axios';
import { AxiosResponse } from 'axios';

interface TripResponse {
    tripId: string;
}

export function CreateTripPage() {
    const navigate = useNavigate();
    const [isGuestsInputVisible, setIsGuestsInputVisible] = useState(false);
    const [isGuestsModalVisible, setIsGuestsModalVisible] = useState(false);
    const [isConfirmTripModalVisible, setIsConfirmTripModalVisible] = useState(false);

    const [destination, setDestination] = useState('');
    const [eventStartAndEndDate, setEventStartAndEndDate] = useState<DateRange | undefined>();
    const [emailList, setEmailList] = useState<string[]>([]);
    const [ownerName, setOwnerName] = useState('');
    const [ownerEmail, setOwnerEmail] = useState('');

    const handleGuestsInput = () => setIsGuestsInputVisible(!isGuestsInputVisible);
    const handleGuestsModal = () => setIsGuestsModalVisible(!isGuestsModalVisible);
    const handleConfirmTripModal = () => setIsConfirmTripModalVisible(!isConfirmTripModalVisible);
    const handleAddEmailToEmailList = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const email = data.get('email')?.toString();

        if (!email) return;

        if (emailList.includes(email)) return;

        setEmailList([...emailList, email]);

        event.currentTarget.reset();
    }
    const handleRemoveEmailFromEmailList = (emailToRemove: string) => {
        const newEmailList = emailList.filter(email => email != emailToRemove);
        setEmailList(newEmailList);
    }
    const handleCreateTrip = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!destination) return;
        if (!eventStartAndEndDate?.from || !eventStartAndEndDate?.to) return;
        if (emailList.length === 0) return;
        if (!ownerName || !ownerEmail) return;

        const options = {
            destination,
            starts_at: eventStartAndEndDate.from,
            ends_at: eventStartAndEndDate.to,
            emails_to_invite: emailList,
            owner_name: ownerName,
            owner_email: ownerEmail,
        }

        try {
            const response: AxiosResponse<TripResponse> = await api.post<TripResponse>('/trips', options)
            const tripId = response.data.tripId
            navigate(`/trips/${tripId}`)
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
        }
    }

    return (
        <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">

            <div className="max-w-3xl w-full px-6 text-center space-y-10">
                <div className='flex flex-col items-center gap-3'>
                    <img src="/logo.svg" alt="plann.er" />
                    <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
                </div>

                <div className='space-y-4'>
                    <DestinationAndDateInput
                        isGuestsInputVisible={isGuestsInputVisible}
                        handleGuestsInput={handleGuestsInput}
                        setDestination={setDestination}
                        eventStartAndEndDate={eventStartAndEndDate}
                        setEventStartAndEndDate={setEventStartAndEndDate}
                    />

                    {isGuestsInputVisible && (
                        <InviteGuestsInput
                            handleGuestsModal={handleGuestsModal}
                            emailList={emailList}
                            handleConfirmTripModal={handleConfirmTripModal}
                        />
                    )}
                </div>

                <p className="text-sm text-zinc-500">Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
                    com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.</p>
            </div>

            {isGuestsModalVisible && (
                <InviteGuestsModal
                    emailList={emailList}
                    handleAddEmailToEmailList={handleAddEmailToEmailList}
                    handleGuestsModal={handleGuestsModal}
                    handleRemoveEmailFromEmailList={handleRemoveEmailFromEmailList}
                />
            )}

            {isConfirmTripModalVisible && (
                <ConfirmTripModal
                    handleConfirmTripModal={handleConfirmTripModal}
                    handleCreateTrip={handleCreateTrip}
                    setOwnerName={setOwnerName}
                    setOwnerEmail={setOwnerEmail}
                />
            )}
        </div>
    )
}
