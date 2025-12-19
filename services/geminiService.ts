
import { GoogleGenAI, Type } from "@google/genai";
import { CompanyProfile, AIStrategyReport } from "../types";

export const generateAIStrategy = async (profile: CompanyProfile): Promise<AIStrategyReport> => {
  // Inicialización con el modelo Flash para máxima velocidad
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Como Consultor Senior de Estrategia Digital, genera un plan de IA para:
    Empresa: ${profile.name}
    Industria: ${profile.industry}
    Tamaño: ${profile.size}
    Objetivos: ${profile.primaryGoals.join(', ')}
    Tecnología: ${profile.currentTechStack}
    Desafíos: ${profile.challenges}

    INSTRUCCIONES TÉCNICAS:
    1. Idioma: Español.
    2. Tono: Ejecutivo (C-Level).
    3. Formato: JSON puro, sin markdown.
    4. FOCO: Acciones concretas de optimización, innovación y mejora de decisiones.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.4, // Menor temperatura para mayor consistencia en JSON
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 0 }, // Desactivar thinking para respuesta inmediata
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            executiveSummary: { type: Type.STRING },
            pillars: {
              type: Type.OBJECT,
              properties: {
                optimization: { 
                  type: Type.ARRAY, 
                  items: { 
                    type: Type.OBJECT, 
                    properties: { 
                      title: { type: Type.STRING }, 
                      description: { type: Type.STRING }, 
                      impactScore: { type: Type.NUMBER }, 
                      complexityScore: { type: Type.NUMBER }, 
                      roiEstimate: { type: Type.STRING } 
                    },
                    required: ["title", "description", "impactScore", "complexityScore", "roiEstimate"]
                  } 
                },
                innovation: { 
                  type: Type.ARRAY, 
                  items: { 
                    type: Type.OBJECT, 
                    properties: { 
                      title: { type: Type.STRING }, 
                      description: { type: Type.STRING }, 
                      impactScore: { type: Type.NUMBER }, 
                      complexityScore: { type: Type.NUMBER }, 
                      roiEstimate: { type: Type.STRING } 
                    },
                    required: ["title", "description", "impactScore", "complexityScore", "roiEstimate"]
                  } 
                },
                decisions: { 
                  type: Type.ARRAY, 
                  items: { 
                    type: Type.OBJECT, 
                    properties: { 
                      title: { type: Type.STRING }, 
                      description: { type: Type.STRING }, 
                      impactScore: { type: Type.NUMBER }, 
                      complexityScore: { type: Type.NUMBER }, 
                      roiEstimate: { type: Type.STRING } 
                    },
                    required: ["title", "description", "impactScore", "complexityScore", "roiEstimate"]
                  } 
                }
              },
              required: ["optimization", "innovation", "decisions"]
            },
            roadmap: { 
              type: Type.ARRAY, 
              items: { 
                type: Type.OBJECT, 
                properties: { 
                  phase: { type: Type.STRING }, 
                  duration: { type: Type.STRING }, 
                  actions: { type: Type.ARRAY, items: { type: Type.STRING } } 
                },
                required: ["phase", "duration", "actions"]
              } 
            },
            risksAndMitigation: { 
              type: Type.ARRAY, 
              items: { 
                type: Type.OBJECT, 
                properties: { 
                  risk: { type: Type.STRING }, 
                  mitigation: { type: Type.STRING } 
                },
                required: ["risk", "mitigation"]
              } 
            }
          },
          required: ["executiveSummary", "pillars", "roadmap", "risksAndMitigation"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Respuesta vacía del servidor.");
    
    // Eliminación de cualquier residuo de markdown
    const jsonStr = text.replace(/```json\n?|```/g, "").trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error en GeminiService:", error);
    throw error;
  }
};
