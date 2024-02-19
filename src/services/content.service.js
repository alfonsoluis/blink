class ContentService {

    constructor() {
        this.testContent = {
            "chapter":"Estructuras III",
            "subject":"Tecnología",
            "instructions": "Señala si son verdaderas o falsas las siguientes frases:",
            "questions": [
                {
                    "id": 1,
                    "text": "Él esfuerzo constante sólo aparece cuando cortamos algo.",
                    "correctAnswer": true,
                    "userAnswer": null
                },
                {
                    "id": 2,
                    "text": "La atracción es un esfuerzo que tiende a estirar un objeto.",
                    "correctAnswer": true,
                    "userAnswer": null
                },
                {
                    "id": 3,
                    "text": "El esqueleto humano está sometido básicamente al esfuerzo de compresión.",
                    "correctAnswer": false,
                    "userAnswer": null
                },
                {
                    "id": 4,
                    "text": "Un vaso de plástico no tiene ningún tipo de estructura.",
                    "correctAnswer": false,
                    "userAnswer": null
                }
            ]
        }
    }

    getTestContent() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.testContent);
            }, 500);
        });
    }

}

const contentServiceInstance = new ContentService();

export default contentServiceInstance;
