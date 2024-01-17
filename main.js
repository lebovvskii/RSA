// Функция для генерации ключей RSA
function generateRSAKeys() {
  const p = generatePrimeNumber();
  const q = generatePrimeNumber();

  //модуль n
  const n = p * q;

  //функция Эйлера
  const euler = (p - 1) * (q - 1);

  // вот тут хз что это делал по алгосу
  const e = 65537;

  // Вычисление закрытой экспоненты d
  const d = modInverse(e, euler);

  // ключи
  return {
    publicKey: {
      n,
      e,
    },
    privateKey: {
      n,
      d,
    },
  };
}

// Функция для шифрования сообщения
const encryptRSA = (message, publicKey) => {
  const { n, e } = publicKey;
  const encryptedMessage = modPow(message, e, n);
  return encryptedMessage;
};

// Функция для расшифрования сообщения
const decryptRSA = (encryptedMessage, privateKey) => {
  const { n, d } = privateKey;
  const decryptedMessage = modPow(encryptedMessage, d, n);
  return decryptedMessage;
};

// Генерация случайного простого числа
const generatePrimeNumber = () => {
  const isPrime = (num) => {
    for (let i = 2; i <= Math.sqrt(num); i++) if (num % i === 0) return false;
    return num > 1;
  };

  let randomPrime;
  do {
    randomPrime = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
  } while (!isPrime(randomPrime));

  return randomPrime;
};

// Возведение в степень по модулю (a^b mod m)
const modPow = (a, b, m) => {
  let result = 1;
  a = a % m;

  while (b > 0) {
    if (b % 2 === 1) {
      result = (result * a) % m;
    }

    b = Math.floor(b / 2);
    a = (a * a) % m;
  }

  return result;
};

// Нахождение обратного по модулю (a^-1 mod m)
const modInverse = (a, m) => {
  const m0 = m;
  let x0 = 0;
  let x1 = 1;

  while (a > 1) {
    const q = Math.floor(a / m);
    let temp = m;
    m = a % m;
    a = temp;

    temp = x0;
    x0 = x1 - q * x0;
    x1 = temp;
  }

  if (x1 < 0) {
    x1 += m0;
  }

  return x1;
};

const keys = generateRSAKeys();
const messageToEncrypt = 150;

console.log('Original Message:', messageToEncrypt);

const encryptedMessage = encryptRSA(messageToEncrypt, keys.publicKey);
console.log('Encrypted Message:', encryptedMessage);

const decryptedMessage = decryptRSA(encryptedMessage, keys.privateKey);
console.log('Decrypted Message:', decryptedMessage);
