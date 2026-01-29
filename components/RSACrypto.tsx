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

  useEffect(() => {
    setIsClient(true);
  }, []);

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
        {
          name: 'RSA-OAEP',
          modulusLength: 2048,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: 'SHA-256',
        },
        true,
        ['encrypt', 'decrypt']
      );

      const publicKeyBuffer = await window.crypto.subtle.exportKey(
        'spki',
        keyPair.publicKey
      );
      const privateKeyBuffer = await window.crypto.subtle.exportKey(
        'pkcs8',
        keyPair.privateKey
      );

      setPublicKey(arrayBufferToBase64(publicKeyBuffer));
      setPrivateKey(arrayBufferToBase64(privateKeyBuffer));
      setMessage('✅ Clés générées avec succès');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage('❌ Erreur : ' + err.message);
    }
  };

  const encryptMessage = async () => {
    try {
      const key = await window.crypto.subtle.importKey(
        'spki',
        base64ToArrayBuffer(publicKey),
        { name: 'RSA-OAEP', hash: 'SHA-256' },
        false,
        ['encrypt']
      );

      const encrypted = await window.crypto.subtle.encrypt(
        { name: 'RSA-OAEP' },
        key,
        new TextEncoder().encode(textToEncrypt)
      );

      setEncryptedText(arrayBufferToBase64(encrypted));
    } catch (err: any) {
      setMessage('❌ Erreur de chiffrement : ' + err.message);
    }
  };

  const decryptMessage = async () => {
    try {
      const key = await window.crypto.subtle.importKey(
        'pkcs8',
        base64ToArrayBuffer(privateKey),
        { name: 'RSA-OAEP', hash: 'SHA-256' },
        false,
        ['decrypt']
      );

      const decrypted = await window.crypto.subtle.decrypt(
        { name: 'RSA-OAEP' },
        key,
        base64ToArrayBuffer(textToDecrypt)
      );

      setDecryptedText(new TextDecoder().decode(decrypted));
    } catch (err: any) {
      setMessage('❌ Erreur de déchiffrement : ' + err.message);
    }
  };

  if (!isClient) {
    return <div>Chargement…</div>;
  }

  return (
    <div style={{ maxWidth: 800, margin: '20px auto' }}>
      <button onClick={generateKeys}>🔑 Générer les clés</button>

      <h3>🔒 Chiffrement</h3>
      <textarea
        value={textToEncrypt}
        onChange={(e) => setTextToEncrypt(e.target.value)}
      />
      <button onClick={encryptMessage}>Chiffrer</button>

      <h3>🔓 Déchiffrement</h3>
      <textarea
        value={textToDecrypt}
        onChange={(e) => setTextToDecrypt(e.target.value)}
      />
      <button onClick={decryptMessage}>Déchiffrer</button>

      {message && <p>{message}</p>}
      {encryptedText && <pre>{encryptedText}</pre>}
      {decryptedText && <pre>{decryptedText}</pre>}
    </div>
  );
}
