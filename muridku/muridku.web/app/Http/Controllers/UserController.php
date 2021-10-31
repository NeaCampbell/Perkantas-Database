<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Rules\MatchMobileEncrypt;

use App\Models\User;

class UserController extends Controller
{

    public function Index() {
        return redirect('/dashboard');
    }

    public function Login() {
        if(Auth::check())
            return redirect()->intended('/dashboard');

        return view('login');
    }

    public function SubmitLogin(Request $request) {
        $email = $request->email;
        $password = $request->password;

        $validation = $request->validate([
            'email' => ['required'],
            'password' => ['required', new MatchMobileEncrypt($email, $password)]
        ]);

        $remember = !is_null($request->remember) && $request->remember == 'on';

        $user = User::where('email', $email)->first();

        if(is_null($user->password_web))
            DB::transaction(function() use ($user, $password) {
                $user->password_web = Hash::make($password);
                $user->save();
            });

        if (Auth::attempt($validation, $remember)) {
            $request->session()->regenerate();
            return redirect()->intended('/dashboard');
        }

        return back()
                ->withInput($request->input())
                ->withErrors([
                    'email' => 'Username/password tidak sesuai.',
                ]);
    }

    public function Logout(Request $request) {
        if(!Auth::check())
            return back()->withErrors([
                'error' => 'Authentication error.',
            ]);

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
