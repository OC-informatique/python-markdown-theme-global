'use client';

import { useState, useEffect } from 'react';

export default function RSACrypto() {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [textToEncrypt, setTextToEncrypt] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [textToDecrypt, setTextToDecrypt] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [message, setMessage] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const base64ToArrayBuffer = (base64: string) => {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  };

  const generateKeys = async () => {
    try {
      const keyPair = await window.crypto.subtle.generateKey(
        { name: 'RSA-OAEP', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
        true,
        ['encrypt', 'decrypt']
      );
      const pub = await window.crypto.subtle.exportKey('spki', keyPair.publicKey);
      const priv = await window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey);

      setPublicKey(arrayBufferToBase64(pub));
      setPrivateKey(arrayBufferToBase64(priv));
      setMessage('✅ Clés générées avec succès');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage('❌ Erreur : ' + err.message);
    }
  };

  const encryptMessage = async () => {
    if (!publicKey || !textToEncrypt) {
      setMessage('⚠️ Entrer une clé publique et un texte');
      return;
    }
    try {
      const key = await window.crypto.subtle.importKey('spki', base64ToArrayBuffer(publicKey), { name: 'RSA-OAEP', hash: 'SHA-256' }, false, ['encrypt']);
      const encrypted = await window.crypto.subtle.encrypt({ name: 'RSA-OAEP' }, key, new TextEncoder().encode(textToEncrypt));
      setEncryptedText(arrayBufferToBase64(encrypted));
      setMessage('✅ Message chiffré !');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage('❌ Erreur de chiffrement : ' + err.message);
    }
  };

  const decryptMessage = async () => {
    if (!privateKey || !textToDecrypt) {
      setMessage('⚠️ Entrer une clé privée et un texte chiffré');
      return;
    }
    try {
      const key = await window.crypto.subtle.importKey('pkcs8', base64ToArrayBuffer(privateKey), { name: 'RSA-OAEP', hash: 'SHA-256' }, false, ['decrypt']);
      const decrypted = await window.crypto.subtle.decrypt({ name: 'RSA-OAEP' }, key, base64ToArrayBuffer(textToDecrypt));
      setDecryptedText(new TextDecoder().decode(decrypted));
      setMessage('✅ Message déchiffré !');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage('❌ Erreur de déchiffrement : ' + err.message);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setMessage('📋 Copié !');
    setTimeout(() => setMessage(''), 2000);
  };

  if (!isClient) return <div style={{ padding: 20, textAlign: 'center' }}>Chargement…</div>;

  return (
    <div style={{ maxWidth: 1000, margin: '20px auto', padding: 20, fontFamily: 'system-ui, sans-serif' }}>
      {message && (
        <div style={{ 
          padding: 12, 
          marginBottom: 20, 
          backgroundColor: message.includes('❌') ? '#fee' : message.includes('⚠️') ? '#fff3cd' : '#efe', 
          color: message.includes('❌') ? '#c33' : message.includes('⚠️') ? '#856404' : '#363', 
          borderRadius: 8,
          fontWeight: 600
        }}>
          {message}
        </div>
      )}

      <div style={{ backgroundColor: '#f8f9fa', padding: 20, borderRadius: 12, marginBottom: 20 }}>
        <h3 style={{ marginTop: 0 }}>🔑 Clés RSA</h3>
        <button 
          onClick={generateKeys} 
          style={{ 
            padding: '12px 24px', 
            borderRadius: 8, 
            backgroundColor: '#667eea', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 16,
            marginBottom: 15
          }}
        >
          Générer nouvelles clés
        </button>

        <div style={{ marginBottom: 15 }}>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Clé publique:</label>
          <textarea 
            value={publicKey}
            onChange={e => setPublicKey(e.target.value)}
            placeholder="Générer ou coller votre clé publique ici..."
            style={{ 
              width: '100%', 
              minHeight: 100, 
              padding: 10, 
              borderRadius: 6, 
              border: '1px solid #ddd', 
              fontSize: 12,
              fontFamily: 'monospace'
            }} 
          />
          {publicKey && (
            <button onClick={() => copyToClipboard(publicKey)} style={{ marginTop: 5, padding: '6px 12px', borderRadius: 6, cursor: 'pointer' }}>
              📋 Copier
            </button>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Clé privée:</label>
          <textarea 
            value={privateKey}
            onChange={e => setPrivateKey(e.target.value)}
            placeholder="Générer ou coller votre clé privée ici..."
            style={{ 
              width: '100%', 
              minHeight: 100, 
              padding: 10, 
              borderRadius: 6, 
              border: '1px solid #ddd', 
              fontSize: 12,
              fontFamily: 'monospace'
            }} 
          />
          {privateKey && (
            <button onClick={() => copyToClipboard(privateKey)} style={{ marginTop: 5, padding: '6px 12px', borderRadius: 6, cursor: 'pointer' }}>
              📋 Copier
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ backgroundColor: '#f8f9fa', padding: 20, borderRadius: 12 }}>
          <h3 style={{ marginTop: 0 }}>🔒 Chiffrer</h3>
          <textarea 
            value={textToEncrypt} 
            onChange={e => setTextToEncrypt(e.target.value)} 
            placeholder="Texte à chiffrer..." 
            style={{ width: '100%', minHeight: 120, padding: 10, borderRadius: 6, border: '1px solid #ddd', fontSize: 14 }} 
          />
          <button 
            onClick={encryptMessage}
            style={{ 
              marginTop: 10,
              padding: '10px 20px', 
              borderRadius: 8, 
              backgroundColor: '#667eea', 
              color: 'white', 
              border: 'none', 
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Chiffrer avec clé publique
          </button>
          {encryptedText && (
            <div style={{ marginTop: 15 }}>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Texte chiffré:</label>
              <textarea
                value={encryptedText}
                readOnly
                style={{ 
                  width: '100%', 
                  minHeight: 120, 
                  padding: 10, 
                  borderRadius: 6, 
                  border: '1px solid #ddd',
                  fontSize: 12,
                  fontFamily: 'monospace',
                  backgroundColor: 'white'
                }}
              />
              <button onClick={() => copyToClipboard(encryptedText)} style={{ marginTop: 5, padding: '6px 12px', borderRadius: 6, cursor: 'pointer' }}>
                📋 Copier
              </button>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#f8f9fa', padding: 20, borderRadius: 12 }}>
          <h3 style={{ marginTop: 0 }}>🔓 Déchiffrer</h3>
          <textarea 
            value={textToDecrypt} 
            onChange={e => setTextToDecrypt(e.target.value)} 
            placeholder="Texte chiffré..." 
            style={{ width: '100%', minHeight: 120, padding: 10, borderRadius: 6, border: '1px solid #ddd', fontSize: 12, fontFamily: 'monospace' }} 
          />
          <button 
            onClick={decryptMessage}
            style={{ 
              marginTop: 10,
              padding: '10px 20px', 
              borderRadius: 8, 
              backgroundColor: '#667eea', 
              color: 'white', 
              border: 'none', 
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Déchiffrer avec clé privée
          </button>
          {decryptedText && (
            <div style={{ marginTop: 15 }}>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 600 }}>Texte déchiffré:</label>
              <div style={{ 
                backgroundColor: '#d4edda', 
                padding: 10, 
                borderRadius: 6, 
                fontSize: 14,
                border: '1px solid #c3e6cb',
                minHeight: 120
              }}>
                {decryptedText}
              </div>
              <button onClick={() => copyToClipboard(decryptedText)} style={{ marginTop: 5, padding: '6px 12px', borderRadius: 6, cursor: 'pointer' }}>
                📋 Copier
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
