export default function LearnMore() {
    return (
        <div className="h-[90vh] w-full px-8 mb-8">
            <div className="h-full w-full bg-slate-200 py-12 px-8 rounded-lg overflow-auto">
                <h2 className="text-2xl text-center font-semibold">Why booking with us?</h2>
                <div className="h-[440px] mt-8 flex justify-center items-center">
                    <div className="h-full rounded-xl bg-slate-500 w-1/3 min-w-[300px] ms-12 flex flex-col justify-center items-center px-8 text-slate-50 overflow-auto">
                        <h3 className="text-2xl font-semibold mb-4">"10/10 Would recommend"</h3>
                        <p className="text-justify indent-8 mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci perspiciatis libero harum repellat officiis cum maiores laboriosam voluptas, delectus non eos dolore, fuga illo officia quia doloremque? Veritatis, consequatur minima?</p>
                        <div className="w-full flex justify-end">
                            <h3>Jessica W.</h3>
                        </div>
                    </div>
                    <div className="h-3/4 rounded-e-xl bg-slate-600 w-1/5 min-w-[200px] overflow-auto text-slate-50 flex flex-col items-center justify-center px-4 py-2">
                        <h3 className="text-lg mb-4">"9/10 Best choice so far"</h3>
                        <p className="text-justify indent-8 mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero explicabo ut excepturi inventore deleniti aperiam!</p>
                        <div className="w-full flex justify-end">
                            <h3>Henderson J.</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}