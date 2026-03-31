import React, { useState, useRef } from 'react';
import { Printer, Upload, Trash2, MapPin, Phone, Mail } from 'lucide-react';

// SignaturePad Component
function SignaturePad({ onSignatureChange }: { onSignatureChange: (dataUrl: string | null) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      onSignatureChange(canvas.toDataURL());
    }
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onSignatureChange(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          width={400}
          height={150}
          className="w-full h-[150px] touch-none cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
      <button type="button" onClick={clear} className="text-sm text-red-500 self-end hover:underline">Limpar Assinatura</button>
    </div>
  );
}

export default function App() {
  // State
  const [logo, setLogo] = useState<string>('');
  const [headerInfo, setHeaderInfo] = useState({
    address: 'Rua Nicarágua 409, Sala 205 Penha - Rio de Janeiro',
    phone: '(21) 4102-4234',
    email: 'atendimento@digitalequipamentos.com.br',
    services: 'Venda | Instalação | Manutenção | Antena Coletiva | CFTV Digital | PABX\nCentrais de Portaria | Alarme | Controle de Acesso e Ponto | Luz de Emergência\nCerca Elétrica | Fechadura Eletrônica | Portão Automático | Informática'
  });
  const [date, setDate] = useState('20,03,26');
  const [osNumber, setOsNumber] = useState('5121');
  const [clientName, setClientName] = useState('ED. PRAIA DE ITAPOA');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('Manutenção');
  const [description, setDescription] = useState('FOI FEITO A AFERIÇÃO E MANUTENÇÃO\nDOS PORTÕES E CAMERAS');
  const [materials, setMaterials] = useState('');
  const [timeIn, setTimeIn] = useState('');
  const [timeOut, setTimeOut] = useState('');
  const [technicianName, setTechnicianName] = useState('Carlos Davi');
  const [signature, setSignature] = useState<string | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex h-screen w-full bg-gray-100 font-sans">
      {/* Sidebar Form */}
      <div className="w-96 bg-white border-r border-gray-200 overflow-y-auto p-6 no-print flex-shrink-0 shadow-lg z-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Gerador de O.S.</h1>
        
        <div className="space-y-6">
          {/* Logo Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Logo da Empresa</label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                {logo ? (
                  <img src={logo} alt="Logo Preview" className="h-full object-contain p-2" />
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <Upload size={24} className="mb-1" />
                    <span className="text-sm">Upload Logo</span>
                  </div>
                )}
              </label>
              {logo && (
                <button onClick={() => setLogo('')} className="p-2 text-red-500 hover:bg-red-50 rounded-full" title="Remover Logo">
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Header Info */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-1">Cabeçalho</h2>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Endereço</label>
              <input type="text" value={headerInfo.address} onChange={e => setHeaderInfo({...headerInfo, address: e.target.value})} className="w-full p-2 border rounded text-sm" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Telefone</label>
              <input type="text" value={headerInfo.phone} onChange={e => setHeaderInfo({...headerInfo, phone: e.target.value})} className="w-full p-2 border rounded text-sm" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Email</label>
              <input type="text" value={headerInfo.email} onChange={e => setHeaderInfo({...headerInfo, email: e.target.value})} className="w-full p-2 border rounded text-sm" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Serviços (separados por |)</label>
              <textarea value={headerInfo.services} onChange={e => setHeaderInfo({...headerInfo, services: e.target.value})} className="w-full p-2 border rounded text-sm h-24" />
            </div>
          </div>

          {/* OS Data */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-1">Dados da O.S.</h2>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Data</label>
                <input type="text" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 border rounded text-sm" placeholder="DD,MM,AA" />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Nº O.S.</label>
                <input type="text" value={osNumber} onChange={e => setOsNumber(e.target.value)} className="w-full p-2 border rounded text-sm text-red-600 font-bold" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Nome / Razão Social</label>
              <input type="text" value={clientName} onChange={e => setClientName(e.target.value)} className="w-full p-2 border rounded text-sm" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Endereço</label>
              <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="w-full p-2 border rounded text-sm" />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Cidade</label>
                <input type="text" value={city} onChange={e => setCity(e.target.value)} className="w-full p-2 border rounded text-sm" />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Telefone</label>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-2 border rounded text-sm" />
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-1">Serviço</h2>
            <div>
              <label className="block text-xs text-gray-500 mb-2">Tipo de Atendimento</label>
              <div className="grid grid-cols-2 gap-2">
                {['Instalação', 'Atendimento', 'Manutenção', 'Outros'].map(type => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="serviceType" value={type} checked={serviceType === type} onChange={e => setServiceType(e.target.value)} className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Descrição</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border rounded text-sm h-32" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Material Utilizado</label>
              <textarea value={materials} onChange={e => setMaterials(e.target.value)} className="w-full p-2 border rounded text-sm h-24" />
            </div>
          </div>

          {/* Footer Info */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-1">Finalização</h2>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Horário de Entrada</label>
                <input type="time" value={timeIn} onChange={e => setTimeIn(e.target.value)} className="w-full p-2 border rounded text-sm" />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Horário de Saída</label>
                <input type="time" value={timeOut} onChange={e => setTimeOut(e.target.value)} className="w-full p-2 border rounded text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Nome do Técnico</label>
              <input type="text" value={technicianName} onChange={e => setTechnicianName(e.target.value)} className="w-full p-2 border rounded text-sm" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Assinatura do Cliente</label>
              <SignaturePad onSignatureChange={setSignature} />
            </div>
          </div>

          {/* Print Button */}
          <button onClick={handlePrint} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors mt-8">
            <Printer size={20} />
            Gerar PDF / Imprimir
          </button>
        </div>
      </div>

      {/* A4 Preview Area */}
      <div className="flex-1 overflow-y-auto flex justify-center p-8 print:p-0 print:overflow-visible">
        {/* The A4 Page container */}
        <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl print:shadow-none a4-container relative box-border text-black font-sans text-[13px] flex flex-col p-[15mm]">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="w-[45%] flex items-center">
              {logo ? (
                <img src={logo} alt="Logo" className="max-h-20 object-contain" />
              ) : (
                <div className="h-20 w-48 bg-gray-100 flex items-center justify-center text-gray-400 border border-dashed border-gray-300">
                  Sua Logo Aqui
                </div>
              )}
            </div>
            <div className="w-[55%] text-[10px] leading-tight text-gray-700">
               <div className="flex items-center gap-1.5 mb-1">
                 <MapPin size={12} className="text-blue-500 flex-shrink-0"/> 
                 <span>{headerInfo.address}</span>
               </div>
               <div className="flex items-center gap-1.5 mb-1">
                 <Phone size={12} className="text-blue-500 flex-shrink-0"/> 
                 <span>{headerInfo.phone}</span>
               </div>
               <div className="flex items-center gap-1.5 mb-2">
                 <Mail size={12} className="text-blue-500 flex-shrink-0"/> 
                 <span>{headerInfo.email}</span>
               </div>
               <div className="text-[9px] text-gray-600 leading-snug whitespace-pre-wrap">
                 {headerInfo.services}
               </div>
            </div>
          </div>

          {/* OS Title & Number */}
          <div className="flex justify-between items-end mb-6">
            <div className="flex items-end gap-1 w-[30%]">
              <span className="font-semibold text-sm">Data:</span>
              <div className="border-b border-black flex-1 text-center pb-0.5 text-[#1e3a8a] font-handwriting text-2xl leading-none">{date}</div>
            </div>
            <div className="w-[40%] text-center font-bold text-lg tracking-wide">
              ORDEM DE SERVIÇO
            </div>
            <div className="w-[30%] text-right font-bold text-red-600 text-lg">
              Nº {osNumber}
            </div>
          </div>

          {/* Client Info */}
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex items-end gap-1">
              <span className="whitespace-nowrap font-semibold">Nome / Razão Social:</span>
              <div className="border-b border-black flex-1 pb-0.5 text-[#1e3a8a] font-handwriting text-2xl leading-none px-2">{clientName}</div>
            </div>
            <div className="flex items-end gap-1">
              <span className="whitespace-nowrap font-semibold">Endereço:</span>
              <div className="border-b border-black flex-1 pb-0.5 text-[#1e3a8a] font-handwriting text-2xl leading-none px-2">{address}</div>
            </div>
            <div className="flex items-end gap-1">
              <span className="whitespace-nowrap font-semibold">Cidade:</span>
              <div className="border-b border-black flex-1 pb-0.5 text-[#1e3a8a] font-handwriting text-2xl leading-none px-2">{city}</div>
            </div>
            <div className="flex items-end gap-1">
              <span className="whitespace-nowrap font-semibold">Telefone:</span>
              <div className="border-b border-black flex-1 pb-0.5 text-[#1e3a8a] font-handwriting text-2xl leading-none px-2">{phone}</div>
            </div>
          </div>

          {/* Service Types */}
          <div className="flex justify-center gap-8 mb-6">
            {['Instalação', 'Atendimento', 'Manutenção', 'Outros'].map(type => (
              <div key={type} className="flex items-center gap-2">
                <div className="w-5 h-5 border border-black flex items-center justify-center relative">
                  {serviceType === type && (
                    <span className="absolute text-[#1e3a8a] font-handwriting text-3xl leading-none -mt-2">X</span>
                  )}
                </div>
                <span className="font-semibold">{type}</span>
              </div>
            ))}
          </div>

          {/* Descrição */}
          <div className="mb-6 flex-1 flex flex-col">
            <div className="text-center font-bold mb-1">Descrição</div>
            <div className="border border-black flex-1 relative bg-lined min-h-[200px]">
               <div className="absolute inset-0 p-2 text-[#1e3a8a] font-handwriting text-[1.7rem] leading-[32px] whitespace-pre-wrap uppercase -mt-1">
                 {description}
               </div>
            </div>
          </div>

          {/* Material Utilizado */}
          <div className="mb-8 h-[200px] flex flex-col">
            <div className="text-center font-bold mb-1">Material Utilizado</div>
            <div className="border border-black flex-1 relative bg-lined">
               <div className="absolute inset-0 p-2 text-[#1e3a8a] font-handwriting text-[1.7rem] leading-[32px] whitespace-pre-wrap uppercase -mt-1">
                 {materials}
               </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between mt-auto">
            <div className="w-[55%] flex flex-col justify-end gap-6">
              <div className="text-xs text-gray-800">
                Concordo com os lançamentos descritos referentes a O.S.<br/>
                <span className="font-semibold">Digital Equipamentos Segurança e Eletrônica</span>
              </div>
              <div className="flex flex-col gap-3 w-4/5">
                <div className="flex items-end gap-1">
                  <span className="whitespace-nowrap font-semibold">Horário de entrada:</span>
                  <div className="border-b border-black flex-1 pb-0.5 text-[#1e3a8a] font-handwriting text-xl leading-none text-center">{timeIn}</div>
                </div>
                <div className="flex items-end gap-1">
                  <span className="whitespace-nowrap font-semibold">Horário de saída:</span>
                  <div className="border-b border-black flex-1 pb-0.5 text-[#1e3a8a] font-handwriting text-xl leading-none text-center">{timeOut}</div>
                </div>
              </div>
            </div>

            <div className="w-[45%] flex flex-col items-center justify-end gap-10">
              <div className="w-full relative flex flex-col items-center">
                {signature && (
                  <img src={signature} alt="Signature" className="absolute bottom-2 max-h-24 object-contain z-10" />
                )}
                <div className="w-full border-t border-black z-0"></div>
                <span className="text-xs mt-1 font-semibold">Assinatura do Responsável</span>
              </div>
              <div className="w-full flex flex-col items-center relative">
                <div className="w-full border-b border-black text-center text-[#1e3a8a] font-handwriting text-3xl leading-none pb-1 absolute bottom-4">
                  {technicianName}
                </div>
                <div className="w-full border-t border-black mt-10"></div>
                <span className="text-xs mt-1 font-semibold">Nome do Técnico</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
