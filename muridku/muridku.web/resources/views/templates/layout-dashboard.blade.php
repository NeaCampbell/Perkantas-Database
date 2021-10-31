@extends('templates/layout')

@section('content')
    <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light main-navbar">
        <div class="container-fluid">
            <a class="navbar-brand" href="{{ url('/') }}">MURIDKU</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    @auth
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Master
                            </a>
                            <div class="dropdown-menu main-navbar-child" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="{{ url('/city') }}" id="menu-city">Kota</a>
                                <a class="dropdown-item" href="{{ url('/institution') }}" id="menu-institution">Institusi</a>
                                <a class="dropdown-item" href="{{ url('/faculty') }}" id="menu-faculty">Fakultas</a>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                KTB
                            </a>
                            <div class="dropdown-menu main-navbar-child" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="{{ url('/material') }}" id="menu-material">Materi KTB</a>
                                <a class="dropdown-item" href="{{ url('/member') }}" id="menu-member">Member</a>
                                <div class="dropdown-divider main-navbar-child-divider"></div>
                                <a class="dropdown-item" href="{{ url('/form-0') }}" id="menu-form-0">Laporan Form Nol</a>
                            </div>
                        </li>
                    @endauth
                </ul>
                @auth
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{auth()->user()->email}}
                            </a>
                            <div class="dropdown-menu main-navbar-child" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="{{url('/logout')}}">Log Out</a>
                            </div>
                        </li>
                    </ul>
                @endauth
            </div>
        </div>
    </nav>
    <div class="container">
        @yield('inner-content')
    </div>
    @auth
        <script type="text/javascript">
            $(document).ready( function () {
                var selectedmenuid = '#menu-' + '{{ isset($selectedmenu) ? $selectedmenu : "" }}';

                if(selectedmenuid !== '' && !$(selectedmenuid).hasClass('active'))
                    $(selectedmenuid).addClass('active');
            });
        </script>
    @endauth
@endsection
