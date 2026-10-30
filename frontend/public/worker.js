import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.14.0';

// Skip local model checks, use HuggingFace CDN
env.allowLocalModels = false;

class MyTranslationPipeline {
    static task = 'translation';
    // Xenova/nllb-200-distilled-600M supports Urdu (urd_Arab) and English (eng_Latn)
    static model = 'Xenova/nllb-200-distilled-600M';
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
}

self.addEventListener('message', async (event) => {
    const { text, sourceLang, targetLang, type } = event.data;

    try {
        let translator = await MyTranslationPipeline.getInstance(x => {
            self.postMessage({ status: 'progress', data: x });
        });

        if (type === 'translate') {
            self.postMessage({ status: 'loading' });
            let output = await translator(text, {
                src_lang: sourceLang,
                tgt_lang: targetLang
            });
            
            self.postMessage({ status: 'complete', result: output[0].translation_text });
        }
    } catch (error) {
        self.postMessage({ status: 'error', error: error.message });
    }
});