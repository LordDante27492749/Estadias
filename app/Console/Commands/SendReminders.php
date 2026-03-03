<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Illuminate\Support\Facades\Log;

class SendReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-reminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sends a reminder to all users.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Log::info('Recordatorios enviados!');
    }
}
